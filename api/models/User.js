const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: null
  },
  balance: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  certificates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certificate'
  }],
  progresses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProgress'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);