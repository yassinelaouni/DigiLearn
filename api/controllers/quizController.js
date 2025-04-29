const Quiz = require('../models/Quiz');

// Get quiz for a course
exports.getQuiz = async (req, res) => {
  try {
    const courseId = req.query.courseId;
    const quiz = await Quiz.findOne({ courseId });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        questions: [],
        errorCode: 'QUIZ_NOT_FOUND',
        errorMessage: 'No quiz found for this course.',
        errors: {},
      });
    }

    res.json({
      success: true,
      questions: quiz.questions,
      errorCode: '',
      errorMessage: '',
      errors: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message,
    });
  }
};