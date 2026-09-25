const crypto = require('crypto');
const Rating = require('../models/Rating');
const Recipe = require('../models/Recipe');

exports.addRating = async (req, res) => {
  const { recipeId } = req.params;
  const { rating } = req.body;

  // 1. Enforce integer value validation between 1 and 5
  const numRating = Number(rating);
  if (!numRating || !Number.isInteger(numRating) || numRating < 1 || numRating > 5) {
    return res.status(400).json({ 
      success: false, 
      message: 'Rating must be an integer between 1 and 5' 
    });
  }

  // 2. Validate recipe exists
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404).json({ success: false, message: 'Recipe not found' });
  }

  // 3. Extract or compute deterministic client identifier
  const rawClient = req.headers['x-client-id'] || 
                    req.ip || 
                    req.headers['x-forwarded-for'] || 
                    req.socket?.remoteAddress || 
                    'anonymous';
  const clientId = crypto.createHash('sha256').update(String(rawClient)).digest('hex').substring(0, 32);

  // 4. Server-side duplicate rating protection
  const existingRatings = await Rating.find({ recipe: recipe._id.toString() });
  const alreadyRated = existingRatings.some(r => r.clientId === clientId);
  if (alreadyRated) {
    return res.status(409).json({
      success: false,
      message: 'You have already submitted a rating for this recipe'
    });
  }

  // 5. Record rating with client identifier
  await Rating.create({
    recipe: recipe._id.toString(),
    rating: numRating,
    clientId
  });

  // 6. Recalculate average rating and count
  const allRatings = await Rating.find({ recipe: recipe._id.toString() });
  const count = allRatings.length;
  const avg = count > 0 
    ? allRatings.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / count 
    : 0;

  recipe.averageRating = Math.round(avg * 10) / 10;
  recipe.ratingCount = count;
  await recipe.save();

  res.status(201).json({ 
    success: true, 
    data: { 
      averageRating: recipe.averageRating, 
      ratingCount: recipe.ratingCount 
    } 
  });
};

exports.getRating = async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId);
  if (!recipe) {
    return res.status(404).json({ success: false, message: 'Recipe not found' });
  }

  res.json({ 
    success: true, 
    data: { 
      averageRating: recipe.averageRating, 
      ratingCount: recipe.ratingCount 
    } 
  });
};
