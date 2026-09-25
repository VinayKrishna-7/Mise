const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.route('/:commentId')
  .delete(commentController.deleteComment);

module.exports = router;
