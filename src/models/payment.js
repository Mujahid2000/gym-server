const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 1,
  },
  id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'success', // Corrected default value assignment
    required: true,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
