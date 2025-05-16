const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: String,
  type: String,
  duration: String,
  description: String,
  videoUrl: String,  // Must match what you save to DB
  moduleId: mongoose.Schema.Types.ObjectId,
  courseId: mongoose.Schema.Types.ObjectId,
  order: Number,
  readingContent: {
    type: String
  },
  pdfUrl: {
    type: String
  },
  description: {
    type: String
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