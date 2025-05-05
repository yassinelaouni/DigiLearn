const Quiz = require('../models/Quiz');

// Get quiz for course
exports.getQuizForCourse = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ courseId: req.params.courseId });

    res.json({
      success: true,
      quiz: quiz || null,
      errorCode: "",
      errorMessage: "",
      errors: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message
    });
  }
};

// Create quiz
exports.createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create({
      ...req.body,
      questions: req.body.questions
    });

    res.status(201).json({
      success: true,
      quiz,
      errorCode: "",
      errorMessage: "",
      errors: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message
    });
  }
};

// Update quiz
exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        questions: req.body.questions
      },
      { new: true }
    );

    res.json({
      success: true,
      quiz,
      errorCode: "",
      errorMessage: "",
      errors: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message
    });
  }
};

// Delete quiz
exports.deleteQuiz = async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error'
    });
  }
};