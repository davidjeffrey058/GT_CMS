const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  family_name: {
    type: String,
    required: true,
    uppercase: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Family', familySchema);