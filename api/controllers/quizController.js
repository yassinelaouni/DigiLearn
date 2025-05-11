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

// Create quiz (already working version)
const createQuiz = async (req, res) => {
  try {
    const { courseId, title, description, questions } = req.body;

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
    const result = await withTransaction(async (session) => {
      const { title, description, questions } = req.body;
      
      // 1. Update or create questions
      const questionUpdates = await Promise.all(
        questions.map(q => 
          q.id 
            ? Question.findByIdAndUpdate(
                q.id, 
                { $set: q },
                { new: true, session }
              )
            : Question.create(
                [{ ...q, quizId: req.params.id }],
                { session }
              ).then(docs => docs[0])
        )
      );

      // 2. Get current quiz questions
      const quiz = await Quiz.findById(req.params.id).session(session);
      const existingQuestionIds = quiz.questions.map(id => id.toString());

      // 3. Identify questions to remove
      const newQuestionIds = questionUpdates.map(q => q._id.toString());
      const questionsToRemove = existingQuestionIds.filter(
        id => !newQuestionIds.includes(id)
      );

      // 4. Delete removed questions
      if (questionsToRemove.length) {
        await Question.deleteMany(
          { _id: { $in: questionsToRemove } },
          { session }
        );
      }

      // 5. Update quiz document
      const updatedQuiz = await Quiz.findByIdAndUpdate(
        req.params.id,
        { 
          title,
          description,
          questions: questionUpdates.map(q => q._id)
        },
        { new: true, session }
      ).populate('questions');

      return updatedQuiz;
    });

    res.json({
      success: true,
      quiz: result,
      errorCode: "",
      errorMessage: "",
      errors: {}
    });

  } catch (err) {
    console.error('Quiz update error:', err);
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message
    });
  }
};

// Delete quiz with transaction support
const deleteQuiz = async (req, res) => {
  try {
    await withTransaction(async (session) => {
      // 1. Find quiz and associated course
      const quiz = await Quiz.findById(req.params.id).session(session);
      if (!quiz) {
        throw new Error('Quiz not found');
      }

      // 2. Remove quiz reference from course
      await Course.updateMany(
        { quiz: quiz._id },
        { $unset: { quiz: "" } },
        { session }
      );

      // 3. Delete all questions
      await Question.deleteMany(
        { _id: { $in: quiz.questions } },
        { session }
      );

      // 4. Delete the quiz
      await Quiz.findByIdAndDelete(req.params.id, { session });
    });

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
};

module.exports = {
  getQuizForCourse,
  getQuizDetails,
  createQuiz,
  updateQuiz,
  deleteQuiz
};