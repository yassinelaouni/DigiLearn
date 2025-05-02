const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  duration: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  featured: {
    type: Boolean,
    default: false
  },
  learningOutcomes: [String],
  modules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }],
  certificates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certificate'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema);