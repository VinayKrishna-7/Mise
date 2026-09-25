const Comment = require('../models/Comment');
const Recipe = require('../models/Recipe');

exports.getComments = async (req, res) => {
  const comments = await Comment.find({ recipe: req.params.recipeId }).sort('-createdAt');
  res.json({ success: true, data: comments });
};

exports.addComment = async (req, res) => {
  const { recipeId } = req.params;
  const { name, text } = req.body;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404).json({ success: false, message: 'Recipe not found' });
  }

  const comment = await Comment.create({
    recipe: recipeId,
    name,
    text
  });

  res.status(201).json({ success: true, data: comment });
};

exports.deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    return res.status(404).json({ success: false, message: 'Comment not found' });
  }

  await comment.deleteOne();
  res.json({ success: true, message: 'Comment deleted' });
};
