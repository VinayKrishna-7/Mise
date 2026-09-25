const mongoose = require('mongoose');
const { isMongooseActive } = require('../config/db');
const { LocalRecipe } = require('../config/localDb');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a recipe title'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  ingredients: {
    type: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true }
      }
    ],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'Recipe must have at least one ingredient'
    }
  },
  instructions: {
    type: [
      {
        step: { type: Number },
        description: { type: String, required: true }
      }
    ],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'Recipe must have at least one instruction step'
    }
  },
  prepTime: {
    type: Number,
    min: [0, 'Prep time must be >= 0'],
    default: 0
  },
  cookTime: {
    type: Number,
    min: [0, 'Cook time must be >= 0'],
    default: 0
  },
  servings: {
    type: Number,
    min: [1, 'Servings must be >= 1'],
    default: 1
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy'
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    trim: true
  },
  cuisine: {
    type: String,
    required: [true, 'Please add a cuisine'],
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  creatorToken: {
    type: String,
    default: ''
  },
  isSystem: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

RecipeSchema.index({
  title: 'text',
  description: 'text',
  cuisine: 'text',
  category: 'text'
});
RecipeSchema.index({ category: 1 });
RecipeSchema.index({ cuisine: 1 });
RecipeSchema.index({ tags: 1 });

const MongooseRecipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);

const RecipeProxy = new Proxy(LocalRecipe, {
  get(target, prop) {
    if (isMongooseActive() && MongooseRecipe[prop]) {
      return typeof MongooseRecipe[prop] === 'function'
        ? MongooseRecipe[prop].bind(MongooseRecipe)
        : MongooseRecipe[prop];
    }
    return target[prop];
  }
});

module.exports = RecipeProxy;
