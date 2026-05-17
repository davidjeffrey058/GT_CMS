const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true
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
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Occupation is required']
  },
  baptism: {
  status: {
    type: String,
    enum: ['none', 'water', 'holy_ghost'],
    default: 'none'
  },
  date: Date
},
educational_level:{
  type: String,
  enum: ['none', 'primary','jhs', 'shs','undergraduate', 'diploma', 'degree', 'postgraduate','master\'s degree', 'phd'],
  default: 'none'
},
marital_status:{
  type: String,
  enum: ['single', 'married', 'divorced'],
  default: 'single'
},
 departments: [{
  type: String,
  enum: [
    'Choir',
    'Ushering',
    'Media',
    'Children Ministry',
    'Youth Ministry',
    'Prayer Team',
    'Protocol',
    'Evangelism',
    'Sanctuary',
    'Technical'
  ]
}],
spouse_details:{
  full_name:{
    type: String,
  },
  phone: {
    type: String
  }
},
  created_by: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
},
  photo: String
}, { timestamps: true });

memberSchema.index({ full_name: 1 });

module.exports = mongoose.model('Member', memberSchema);