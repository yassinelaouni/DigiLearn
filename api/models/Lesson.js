const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  duration: {
    type: String,
    default: '10 min'
  },
  type: {
    type: String,
    enum: ['video', 'reading', 'quiz'],
    default: 'video'
  },
  videoUrl: {
    type: String
  },
  readingContent: {
    type: String
  },
  pdfUrl: {
    type: String
  },
  description: {
    type: String
  },
  order: {
    type: Number,
    required: true
  },
  progresses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProgress'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lesson', LessonSchema);