const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  dob: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  phone: {
    type: String,
    unique: true,
    sparse: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  address: String,
  membership_status: {
    type: String,
    enum: ['active', 'inactive', 'visitor'],
    default: 'active'
  },
  family_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Family'
  },
  photo: String
}, { timestamps: true });

memberSchema.index({ full_name: 1 });

module.exports = mongoose.model('Member', memberSchema);