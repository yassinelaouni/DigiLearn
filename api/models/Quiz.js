const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  passingScore: {
    type: Number,
    default: 70
  }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);