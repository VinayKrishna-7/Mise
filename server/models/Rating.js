const mongoose = require('mongoose');
const { isMongooseActive } = require('../config/db');
const { LocalRating } = require('../config/localDb');

const RatingSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true,
    index: true
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  clientId: {
    type: String,
    default: '',
    index: true
  }
}, {
  timestamps: true
});

const MongooseRating = mongoose.models.Rating || mongoose.model('Rating', RatingSchema);

const RatingProxy = new Proxy(LocalRating, {
  get(target, prop) {
    if (isMongooseActive() && MongooseRating[prop]) {
      return typeof MongooseRating[prop] === 'function'
        ? MongooseRating[prop].bind(MongooseRating)
        : MongooseRating[prop];
    }
    return target[prop];
  }
});

module.exports = RatingProxy;
