const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected'); //DB connection successful
  } catch (err) {
    console.error('DB connection failed:', err.message);
    process.exit(1); // stop the server if DB fails
  }
};

module.exports = connectDB;