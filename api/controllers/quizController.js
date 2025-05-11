const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

// Get quiz for course
const getQuizForCourse = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ courseId: req.params.courseId })
      .populate({
        path: 'questions',
        select: 'question options correctAnswer feedback'
      });

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

// Get quiz details
const getQuizDetails = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId)
      .populate({
        path: 'questions',
        select: 'question options correctAnswer feedback'
      });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        errorMessage: 'Quiz not found',
        errors: {}
      });
    }

    res.json({
      success: true,
      quiz: {
        ...quiz._doc,
        questions: quiz.questions.map(q => ({
          id: q._id,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          feedback: q.feedback
        }))
      },
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
const createQuiz = async (req, res) => {
  try {
    // First create questions
    const questions = await Question.insertMany(req.body.questions);
    const questionIds = questions.map(q => q._id);

    // Then create quiz with question references
    const quiz = await Quiz.create({
      courseId: req.body.courseId,
      questions: questionIds
    });

    res.status(201).json({
      success: true,
      quiz: {
        ...quiz._doc,
        questions
      },
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
const updateQuiz = async (req, res) => {
  try {
    // Update questions first
    const questionUpdates = req.body.questions.map(q => 
      Question.findByIdAndUpdate(q.id, q, { new: true })
    );
    const updatedQuestions = await Promise.all(questionUpdates);

    // Then update quiz
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        questions: updatedQuestions.map(q => q._id)
      },
      { new: true }
    ).populate('questions');

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
const deleteQuiz = async (req, res) => {
  try {
    // First delete questions
    const quiz = await Quiz.findById(req.params.id);
    await Question.deleteMany({ _id: { $in: quiz.questions } });

    // Then delete quiz
    await Quiz.findByIdAndDelete(req.params.id);

    res.json({ 
      success: true,
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

module.exports = {
  getQuizForCourse,
  getQuizDetails,
  createQuiz,
  updateQuiz,
  deleteQuiz
};