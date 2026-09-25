const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const mingo = require('mingo');

// Register all required mingo operators
require('mingo/operators/query');
require('mingo/operators/pipeline');
require('mingo/operators/accumulator');
require('mingo/operators/expression');

const DATA_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const generateId = () => crypto.randomBytes(12).toString('hex');

class LocalDB {
  constructor() {
    this.data = { recipes: [], comments: [], ratings: [] };
    this.ensureDataFile();
  }

  ensureDataFile() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      try {
        const stats = fs.statSync(DB_FILE);
        this.lastMtime = stats.mtimeMs;
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        this.data = JSON.parse(raw);
        if (!Array.isArray(this.data.recipes)) this.data.recipes = [];
        if (!Array.isArray(this.data.comments)) this.data.comments = [];
        if (!Array.isArray(this.data.ratings)) this.data.ratings = [];
      } catch (err) {
        console.warn('Could not parse db.json, creating new database file:', err.message);
        this.save();
      }
    } else {
      this.save();
    }
  }

  checkReload() {
    if (fs.existsSync(DB_FILE)) {
      try {
        const stats = fs.statSync(DB_FILE);
        if (stats.mtimeMs > (this.lastMtime || 0)) {
          this.ensureDataFile();
        }
      } catch (e) {}
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('Failed to save db.json:', err.message);
    }
  }

  createDoc(collectionName, docData) {
    const doc = { ...docData };
    if (!doc._id) {
      doc._id = generateId();
    } else {
      doc._id = doc._id.toString();
    }
    const now = new Date();
    if (!doc.createdAt) doc.createdAt = now;
    doc.updatedAt = now;

    // Attach document methods
    this.attachDocMethods(collectionName, doc);
    return doc;
  }

  attachDocMethods(collectionName, doc) {
    doc.save = async () => {
      doc.updatedAt = new Date();
      const list = this.data[collectionName];
      const idx = list.findIndex(d => d._id.toString() === doc._id.toString());
      if (idx !== -1) {
        list[idx] = { ...doc };
        this.attachDocMethods(collectionName, list[idx]);
      }
      this.save();
      return doc;
    };

    doc.deleteOne = async () => {
      this.data[collectionName] = this.data[collectionName].filter(
        d => d._id.toString() !== doc._id.toString()
      );
      this.save();
      return { deletedCount: 1 };
    };

    doc.toObject = () => ({ ...doc });
    doc.toJSON = () => ({ ...doc });
  }

  getModel(collectionName) {
    const self = this;

    class QueryChain {
      constructor(items) {
        this.items = items;
        this.sortSpec = null;
        this.skipCount = 0;
        this.limitCount = null;
      }

      sort(spec) {
        this.sortSpec = spec;
        return this;
      }

      skip(n) {
        this.skipCount = Number(n) || 0;
        return this;
      }

      limit(n) {
        this.limitCount = Number(n);
        return this;
      }

      execute() {
        let results = [...this.items];

        if (this.sortSpec) {
          let sortFields = {};
          if (typeof this.sortSpec === 'string') {
            const parts = this.sortSpec.split(' ').filter(Boolean);
            parts.forEach(p => {
              if (p.startsWith('-')) {
                sortFields[p.slice(1)] = -1;
              } else {
                sortFields[p] = 1;
              }
            });
          } else if (typeof this.sortSpec === 'object') {
            sortFields = this.sortSpec;
          }

          results.sort((a, b) => {
            for (const [key, dir] of Object.entries(sortFields)) {
              let valA = a[key];
              let valB = b[key];
              if (valA === undefined) valA = 0;
              if (valB === undefined) valB = 0;

              if (valA instanceof Date) valA = valA.getTime();
              if (valB instanceof Date) valB = valB.getTime();

              if (typeof valA === 'string' && typeof valB === 'string') {
                const cmp = valA.localeCompare(valB);
                if (cmp !== 0) return dir === -1 ? -cmp : cmp;
              } else {
                if (valA < valB) return dir === -1 ? 1 : -1;
                if (valA > valB) return dir === -1 ? -1 : 1;
              }
            }
            return 0;
          });
        }

        if (this.skipCount > 0) {
          results = results.slice(this.skipCount);
        }
        if (this.limitCount !== null && !isNaN(this.limitCount)) {
          results = results.slice(0, this.limitCount);
        }

        return results.map(d => {
          self.attachDocMethods(collectionName, d);
          return d;
        });
      }

      then(resolve, reject) {
        try {
          resolve(this.execute());
        } catch (err) {
          if (reject) reject(err);
          else throw err;
        }
      }
    }

    return {
      find: (query = {}) => {
        self.checkReload();
        let matched = self.data[collectionName];
        if (Object.keys(query).length > 0) {
          try {
            const mQuery = new mingo.Query(query);
            matched = matched.filter(d => mQuery.test(d));
          } catch (e) {
            // Fallback filtering if mingo throws on edge cases
            matched = matched.filter(d => {
              for (const [k, v] of Object.entries(query)) {
                if (v instanceof RegExp) {
                  if (!v.test(String(d[k] || ''))) return false;
                } else if (typeof v === 'object' && v !== null) {
                  // Ignore unsupported query operator in fallback
                } else if (d[k]?.toString() !== v?.toString()) {
                  return false;
                }
              }
              return true;
            });
          }
        }
        return new QueryChain(matched);
      },

      countDocuments: async (query = {}) => {
        self.checkReload();
        if (!query || Object.keys(query).length === 0) {
          return self.data[collectionName].length;
        }
        try {
          const mQuery = new mingo.Query(query);
          return self.data[collectionName].filter(d => mQuery.test(d)).length;
        } catch (e) {
          return self.data[collectionName].length;
        }
      },

      findById: async (id) => {
        self.checkReload();
        if (!id) return null;
        const targetId = id.toString();
        const doc = self.data[collectionName].find(d => d._id.toString() === targetId);
        if (!doc) return null;
        self.attachDocMethods(collectionName, doc);
        return doc;
      },

      create: async (data) => {
        const doc = self.createDoc(collectionName, data);
        self.data[collectionName].push(doc);
        self.save();
        return doc;
      },

      insertMany: async (docs) => {
        const created = docs.map(d => self.createDoc(collectionName, d));
        self.data[collectionName].push(...created);
        self.save();
        return created;
      },

      findByIdAndUpdate: async (id, updateData, options = {}) => {
        const targetId = id ? id.toString() : '';
        const idx = self.data[collectionName].findIndex(d => d._id.toString() === targetId);
        if (idx === -1) return null;

        const current = self.data[collectionName][idx];
        const updated = {
          ...current,
          ...updateData,
          _id: current._id,
          createdAt: current.createdAt,
          updatedAt: new Date()
        };

        self.attachDocMethods(collectionName, updated);
        self.data[collectionName][idx] = updated;
        self.save();
        return updated;
      },

      deleteMany: async (query = {}) => {
        if (!query || Object.keys(query).length === 0) {
          const count = self.data[collectionName].length;
          self.data[collectionName] = [];
          self.save();
          return { deletedCount: count };
        }

        const initialCount = self.data[collectionName].length;
        try {
          const mQuery = new mingo.Query(query);
          self.data[collectionName] = self.data[collectionName].filter(d => !mQuery.test(d));
        } catch (e) {
          // Simple key-value filter
          self.data[collectionName] = self.data[collectionName].filter(d => {
            for (const [k, v] of Object.entries(query)) {
              if (d[k]?.toString() === v?.toString()) return false;
            }
            return true;
          });
        }
        self.save();
        return { deletedCount: initialCount - self.data[collectionName].length };
      },

      aggregate: async (pipeline = []) => {
        const docs = self.data[collectionName];
        try {
          // Normalize objectId comparisons in pipeline matches
          const safePipeline = pipeline.map(stage => {
            if (stage.$match) {
              const safeMatch = {};
              for (const [k, v] of Object.entries(stage.$match)) {
                safeMatch[k] = v && v._id ? v._id.toString() : v ? v.toString() : v;
              }
              return { $match: safeMatch };
            }
            return stage;
          });

          // Normalize docs for matching
          const normalizedDocs = docs.map(d => ({
            ...d,
            recipe: d.recipe ? d.recipe.toString() : d.recipe
          }));

          const agg = new mingo.Aggregator(safePipeline);
          return agg.run(normalizedDocs);
        } catch (e) {
          console.warn('Aggregation fallback:', e.message);
          // Simple manual fallback for ratings aggregation:
          // { $match: { recipe: ... } }, { $group: { _id: '$recipe', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
          const matchStage = pipeline.find(s => s.$match);
          let filtered = docs;
          if (matchStage && matchStage.$match && matchStage.$match.recipe) {
            const rId = matchStage.$match.recipe.toString();
            filtered = docs.filter(d => d.recipe && d.recipe.toString() === rId);
          }
          if (filtered.length === 0) return [];
          const totalRating = filtered.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0);
          return [{
            _id: filtered[0].recipe,
            avg: totalRating / filtered.length,
            count: filtered.length
          }];
        }
      }
    };
  }
}

const localDB = new LocalDB();

module.exports = {
  localDB,
  LocalRecipe: localDB.getModel('recipes'),
  LocalComment: localDB.getModel('comments'),
  LocalRating: localDB.getModel('ratings')
};
