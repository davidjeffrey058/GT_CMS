const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  member_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    default: 'present'
  }
}, { timestamps: true });

attendanceSchema.index({ member_id: 1, event_id: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);