const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI; // Database name in URI

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
  return mongoose.connection;
}

module.exports = connectDB;