// models/User.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  preferences: {
    budget: Number,
    brand: String,
    useCase: String,
  },
  chatHistory: [
    {
      query: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});
module.exports = mongoose.model('User ', userSchema);