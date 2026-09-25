const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const commentController = require('../controllers/commentController');
const ratingController = require('../controllers/ratingController');
const { upload } = require('../middleware/upload');
const { recipeMutationLimiter, commentLimiter, ratingLimiter } = require('../middleware/rateLimiter');

// Real database stats endpoint
router.get('/stats', recipeController.getRecipeStats);

// Real search suggestions endpoint
router.get('/suggestions', recipeController.getSearchSuggestions);

// Recipe CRUD endpoints
router.route('/')
  .get(recipeController.getRecipes)
  .post(recipeMutationLimiter, upload, recipeController.createRecipe);

router.route('/:id')
  .get(recipeController.getRecipe)
  .put(recipeMutationLimiter, upload, recipeController.updateRecipe)
  .delete(recipeMutationLimiter, recipeController.deleteRecipe);

// Comments nested endpoints
router.route('/:recipeId/comments')
  .get(commentController.getComments)
  .post(commentLimiter, commentController.addComment);

// Ratings nested endpoints
router.route('/:recipeId/rating')
  .get(ratingController.getRating)
  .post(ratingLimiter, ratingController.addRating);

module.exports = router;
