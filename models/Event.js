const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  },
  location: String,
  assigned_roles: [{
    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    },
    role: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);