const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['video', 'text', 'quiz'],
    default: 'video',
  },
  videoUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  order: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Lesson', LessonSchema);