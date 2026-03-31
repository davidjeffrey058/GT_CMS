const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Minimum password length is 6 characters']
  },
  role: {
    type: String,
    enum: ['admin', 'pastor', 'finance', 'staff'],
    default: 'staff'
  },
  member_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    unique: true
  }
}, { timestamps: true });


// Hash password before saving
userSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
});

// Compare password
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);