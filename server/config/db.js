const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      isConnected = true;
      console.log('MongoDB Connected to provided MONGODB_URI');
      return process.env.MONGODB_URI;
    } catch (error) {
      console.warn(`MongoDB connection to ${process.env.MONGODB_URI} failed: ${error.message}`);
      console.log('Falling back to persistent local database engine...');
    }
  }

  // Pure JavaScript local persistent database engine
  console.log('Using persistent local database engine (data stored in server/data/db.json)');
  return 'local-db';
};

const isMongooseActive = () => isConnected;

module.exports = connectDB;
module.exports.connectDB = connectDB;
module.exports.isMongooseActive = isMongooseActive;
