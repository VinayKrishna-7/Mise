const mongoose = require('mongoose');
const { isMongooseActive } = require('../config/db');
const { LocalComment } = require('../config/localDb');

const CommentSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    minlength: [1, 'Name must be at least 1 character'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  text: {
    type: String,
    required: [true, 'Please add comment text'],
    trim: true,
    minlength: [2, 'Comment must be at least 2 characters'],
    maxlength: [500, 'Comment cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

const MongooseComment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);

const CommentProxy = new Proxy(LocalComment, {
  get(target, prop) {
    if (isMongooseActive() && MongooseComment[prop]) {
      return typeof MongooseComment[prop] === 'function'
        ? MongooseComment[prop].bind(MongooseComment)
        : MongooseComment[prop];
    }
    return target[prop];
  }
});

module.exports = CommentProxy;
