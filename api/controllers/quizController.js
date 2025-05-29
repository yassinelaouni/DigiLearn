const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Course = require('../models/Course');
const mongoose = require('mongoose');

// Helper function for transaction handling
const withTransaction = async (fn) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const result = await fn(session);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

// Get quiz for course
const getQuizForCourse = async (req, res) => {
  try {
    // First get the course to find the quiz ID
    const course = await Course.findById(req.params.courseId);
    if (!course || !course.quiz) {
      return res.status(404).json({
        success: false,
        errorMessage: "Quiz not found for this course"
      });
    }

    // Then get the quiz by its ID
    const quiz = await Quiz.findById(course.quiz)
      .populate({
        path: 'questions',
        select: 'question options correctAnswer feedback'
      });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        errorMessage: "Quiz not found"
      });
    }

    res.json({
      success: true,
      quiz: {
        id: quiz._id,
        title: quiz.title,
        questions: quiz.questions.map(q => ({
          id: q._id,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          feedback: q.feedback
        }))
      }
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

// Create quiz (already working version)
const createQuiz = async (req, res) => {
  try {
    const { courseId, title, description, questions } = req.body;
    console.log('Creating quiz with data:', req.body);

    // Validate input
    if (!title || !courseId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate each question
    const isValidQuestion = q =>
      q.question &&
      q.options &&
      Array.isArray(q.options) &&
      q.options.length === 4 &&
      q.options.every(opt => opt.trim() !== '') &&
      Number.isInteger(q.correctAnswer) &&
      q.correctAnswer >= 0 &&
      q.correctAnswer <= 3;

    if (!questions.every(isValidQuestion)) {
      return res.status(400).json({ error: 'Invalid question format' });
    }

    // 1. Validate course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // 2. Check if course already has a quiz
    if (course.quiz) {
      return res.status(400).json({
        success: false,
        error: 'Course already has a quiz'
      });
    }

    // 3. Create questions
    const questionDocs = await Question.create(
      questions.map(q => ({
        ...q,
        quizId: new mongoose.Types.ObjectId() // Temporary ID
      }))
    );

    // 4. Create quiz with question references
    const quiz = new Quiz({
      title,
      description,
      questions: questionDocs.map(q => q._id)
    });
    await quiz.save();

    // 5. Update questions with correct quizId
    await Question.updateMany(
      { _id: { $in: questionDocs.map(q => q._id) } },
      { $set: { quizId: quiz._id } }
    );

    // 6. Attach quiz to course
    course.quiz = quiz._id;
    await course.save();

    // 7. Return populated quiz
    const populatedQuiz = await Quiz.findById(quiz._id)
      .populate('questions');

    res.status(201).json({
      success: true,
      quiz: populatedQuiz
    });

  } catch (err) {
    console.error('Quiz creation error:', err);
    res.status(500).json({
      success: false,
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// Update quiz with transaction support
const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, questions, courseId } = req.body;

    // Basic validation
    if (!title || !questions || !Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        errorMessage: 'Title and questions array are required',
        errors: {}
      });
    }

    // Verify quiz exists
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        errorMessage: 'Quiz not found',
        errors: {}
      });
    }

    // Process questions
    const questionUpdates = await Promise.all(
      // In your updateQuiz controller
      questions.map(async (q) => {
        // New question (no ID provided)
        if (!q.id) {
          const newQuestion = await Question.create({
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            feedback: q.feedback || '',
            quizId: id
          });
          return newQuestion._id;
        }

        // Existing question (has ID)
        await Question.findByIdAndUpdate(q.id, {
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          feedback: q.feedback || ''
        });
        return q.id;
      })
    );

    // Update quiz document
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      {
        title,
        description,
        courseId,
        questions: questionUpdates
      },
      { new: true }
    ).populate('questions');

    res.json({
      success: true,
      quiz: updatedQuiz,
      errorCode: "",
      errorMessage: "",
      errors: {}
    });

  } catch (err) {
    console.error('Quiz update error:', err);
    res.status(500).json({
      success: false,
      errorMessage: err.message || 'Server error',
      errors: {}
    });
  }
};

// Delete quiz with transaction support
// Delete quiz without transaction support
const deleteQuiz = async (req, res) => {
  try {
    // 1. Find quiz
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        errorMessage: 'Quiz not found',
        errors: {}
      });
    }

    // 2. Remove quiz reference from course
    await Course.updateMany(
      { quiz: quiz._id },
      { $unset: { quiz: "" } }
    );

    // 3. Delete all questions
    await Question.deleteMany(
      { _id: { $in: quiz.questions } }
    );

    // 4. Delete the quiz
    await Quiz.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      errorCode: "",
      errorMessage: "",
      errors: {}
    });

  } catch (err) {
    console.error('Quiz deletion error:', err);
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message
    });
  }
};;

module.exports = {
  getQuizForCourse,
  getQuizDetails,
  createQuiz,
  updateQuiz,
  deleteQuiz
};