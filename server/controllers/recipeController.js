const crypto = require('crypto');
const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');
const Rating = require('../models/Rating');
const { deleteImageFile } = require('../services/imageService');

// GET /api/recipes/stats - Return honest real counts from the database
exports.getRecipeStats = async (req, res) => {
  const recipes = await Recipe.find({});
  
  const categoryCounts = {};
  const cuisineCounts = {};
  let quickMealsCount = 0;

  recipes.forEach(r => {
    // Primary Category tally
    if (r.category) {
      categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
    }
    // Primary Cuisine tally
    if (r.cuisine) {
      cuisineCounts[r.cuisine] = (cuisineCounts[r.cuisine] || 0) + 1;
    }
    // Quick meals tally (prep + cook <= 30 min)
    const totalTime = (Number(r.prepTime) || 0) + (Number(r.cookTime) || 0);
    if (totalTime > 0 && totalTime <= 30) {
      quickMealsCount++;
    }
  });

  res.json({
    success: true,
    data: {
      totalRecipes: recipes.length,
      categoryCounts,
      cuisineCounts,
      quickMealsCount
    }
  });
};

// GET /api/recipes/suggestions?q=term - Real live search suggestions
exports.getSearchSuggestions = async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q || q.length < 2) {
    return res.json({ success: true, data: { recipes: [], cuisines: [], categories: [] } });
  }

  const regex = new RegExp(q, 'i');
  const allRecipes = await Recipe.find({});

  const matchedRecipes = allRecipes
    .filter(r => 
      regex.test(r.title) || 
      (Array.isArray(r.tags) && r.tags.some(t => regex.test(t))) ||
      (Array.isArray(r.ingredients) && r.ingredients.some(i => regex.test(i.name || ''))) ||
      regex.test(r.description || '')
    )
    .sort((a, b) => {
      const aTitle = regex.test(a.title);
      const bTitle = regex.test(b.title);
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      return 0;
    })
    .slice(0, 6)
    .map(r => ({ _id: r._id, title: r.title, cuisine: r.cuisine, category: r.category, image: r.image }));

  const matchedCuisines = [...new Set(
    allRecipes
      .map(r => r.cuisine)
      .filter(c => c && regex.test(c))
  )].slice(0, 4);

  const matchedCategories = [...new Set(
    allRecipes
      .map(r => r.category)
      .filter(cat => cat && regex.test(cat))
  )].slice(0, 4);

  res.json({
    success: true,
    data: {
      recipes: matchedRecipes,
      cuisines: matchedCuisines,
      categories: matchedCategories
    }
  });
};

// GET /api/recipes - Full filter, search, sort, and pagination
exports.getRecipes = async (req, res) => {
  const { search, category, cuisine, difficulty, maxTime, sort, page = 1, limit = 12 } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { cuisine: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
      { 'ingredients.name': { $regex: search, $options: 'i' } }
    ];
  }

  // Exact primary category match to ensure counts are 100% truthful and consistent
  if (category) {
    query.category = new RegExp(`^${category}$`, 'i');
  }

  if (cuisine) {
    query.cuisine = new RegExp(`^${cuisine}$`, 'i');
  }

  if (difficulty) {
    query.difficulty = difficulty;
  }
  
  if (maxTime) {
    query.$expr = {
      $lte: [{ $add: ['$prepTime', '$cookTime'] }, parseInt(maxTime, 10)]
    };
  }

  let sortOption = { createdAt: -1 };
  if (sort) {
    switch (sort) {
      case 'newest': sortOption = { createdAt: -1 }; break;
      case 'oldest': sortOption = { createdAt: 1 }; break;
      case 'rating': sortOption = { averageRating: -1 }; break;
      case 'rating_asc': sortOption = { averageRating: 1 }; break;
      case 'fastest': sortOption = { cookTime: 1 }; break;
      case 'slowest': sortOption = { cookTime: -1 }; break;
      case 'az': sortOption = { title: 1 }; break;
      case 'za': sortOption = { title: -1 }; break;
      default: sortOption = { createdAt: -1 };
    }
  }

  const pageNumber = Math.max(1, parseInt(page, 10) || 1);
  const limitNumber = Math.max(1, parseInt(limit, 10) || 12);
  const startIndex = (pageNumber - 1) * limitNumber;

  const totalRecipes = await Recipe.countDocuments(query);
  const recipes = await Recipe.find(query)
    .sort(sortOption)
    .skip(startIndex)
    .limit(limitNumber);

  res.json({
    success: true,
    data: recipes,
    currentPage: pageNumber,
    totalPages: Math.ceil(totalRecipes / limitNumber),
    totalRecipes
  });
};

// GET /api/recipes/:id
exports.getRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ success: false, message: 'Recipe not found' });
  }
  res.json({ success: true, data: recipe });
};

// POST /api/recipes - Anonymous creation with cryptographically secure creatorToken
exports.createRecipe = async (req, res) => {
  const recipeData = { ...req.body };

  if (req.file) {
    recipeData.image = `/uploads/${req.file.filename}`;
  }

  if (typeof recipeData.ingredients === 'string') {
    try {
      recipeData.ingredients = JSON.parse(recipeData.ingredients);
    } catch (e) {
      return res.status(400).json({ success: false, message: 'Invalid ingredients format' });
    }
  }
  if (typeof recipeData.instructions === 'string') {
    try {
      recipeData.instructions = JSON.parse(recipeData.instructions);
    } catch (e) {
      return res.status(400).json({ success: false, message: 'Invalid instructions format' });
    }
  }
  if (recipeData.tags) {
    if (typeof recipeData.tags === 'string') {
      try {
        recipeData.tags = JSON.parse(recipeData.tags);
      } catch (e) {
        recipeData.tags = recipeData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      }
    }
  }

  // Generate anonymous creator authorization token
  const creatorToken = crypto.randomBytes(24).toString('hex');
  recipeData.creatorToken = creatorToken;
  recipeData.isSystem = false;

  const recipe = await Recipe.create(recipeData);
  res.status(201).json({ success: true, data: recipe, creatorToken });
};

// PUT /api/recipes/:id - Protected by creatorToken if set
exports.updateRecipe = async (req, res) => {
  let recipe = await Recipe.findById(req.params.id);
  
  if (!recipe) {
    return res.status(404).json({ success: false, message: 'Recipe not found' });
  }

  // Security check: prevent modification of foundation archive recipes
  if (recipe.isSystem) {
    return res.status(403).json({
      success: false,
      message: 'Foundation archive recipes cannot be modified.'
    });
  }

  // Security check: verify creator token if present on recipe
  const incomingToken = req.headers['x-creator-token'];
  if (recipe.creatorToken && recipe.creatorToken !== incomingToken) {
    return res.status(403).json({
      success: false,
      message: 'You do not have permission to modify this recipe.'
    });
  }

  const updateData = { ...req.body };

  if (req.file) {
    if (recipe.image) {
      deleteImageFile(recipe.image);
    }
    updateData.image = `/uploads/${req.file.filename}`;
  }

  if (typeof updateData.ingredients === 'string') {
    try {
      updateData.ingredients = JSON.parse(updateData.ingredients);
    } catch (e) {}
  }
  if (typeof updateData.instructions === 'string') {
    try {
      updateData.instructions = JSON.parse(updateData.instructions);
    } catch (e) {}
  }
  if (updateData.tags) {
    if (typeof updateData.tags === 'string') {
      try {
        updateData.tags = JSON.parse(updateData.tags);
      } catch (e) {
        updateData.tags = updateData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      }
    }
  }

  // Preserve internal system/security flags
  delete updateData.creatorToken;
  delete updateData.isSystem;

  recipe = await Recipe.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true
  });

  res.json({ success: true, data: recipe });
};

// DELETE /api/recipes/:id - Protect system recipes & verify creatorToken
exports.deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  
  if (!recipe) {
    return res.status(404).json({ success: false, message: 'Recipe not found' });
  }

  // Security check: prevent deletion of foundation archive recipes
  if (recipe.isSystem) {
    return res.status(403).json({
      success: false,
      message: 'Foundation archive recipes cannot be deleted.'
    });
  }

  // Security check: verify creator token if present
  const incomingToken = req.headers['x-creator-token'];
  if (recipe.creatorToken && recipe.creatorToken !== incomingToken) {
    return res.status(403).json({
      success: false,
      message: 'You do not have permission to delete this recipe.'
    });
  }

  if (recipe.image) {
    deleteImageFile(recipe.image);
  }

  await Comment.deleteMany({ recipe: req.params.id });
  await Rating.deleteMany({ recipe: req.params.id });
  await recipe.deleteOne();

  res.json({ success: true, message: 'Recipe deleted successfully' });
};
