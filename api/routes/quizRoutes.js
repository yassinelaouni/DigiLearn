const express = require('express');
const router = express.Router();
const {
  getQuizForCourse,
  createQuiz,
  updateQuiz,
  deleteQuiz
} = require('../controllers/quizController');
const { protect, adminProtect } = require('../middlewares/auth');

// Public route
router.get('/courses/:courseId/quiz', getQuizForCourse);

// Admin protected routes
router.post('/quizzes', protect, adminProtect, createQuiz);
router.put('/quizzes/:id', protect, adminProtect, updateQuiz);
router.delete('/quizzes/:id', protect, adminProtect, deleteQuiz);

module.exports = router;