const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  member_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['tithe', 'offering', 'donation'],
    required: true
  },
  payment_method: {
    type: String,
    enum: ['cash', 'momo', 'bank']
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

donationSchema.index({ date: 1 });

module.exports = mongoose.model('Donation', donationSchema);