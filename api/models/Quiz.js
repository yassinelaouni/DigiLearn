const mongoose = require('mongoose');

// Check if model already exists before defining it
if (mongoose.models.Quiz) {
  module.exports = mongoose.model('Quiz');
} else {
  const QuizSchema = new mongoose.Schema({
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    questions: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  module.exports = mongoose.model('Quiz', QuizSchema);
}