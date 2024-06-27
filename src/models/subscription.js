const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Subscribe = mongoose.model('Subscribe', SubscriptionSchema);

module.exports = Subscribe;
