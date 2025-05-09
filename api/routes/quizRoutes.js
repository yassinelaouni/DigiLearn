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
router.post('/quizzes', createQuiz);
router.put('/quizzes/:id',  updateQuiz);
router.delete('/quizzes/:id',deleteQuiz);

module.exports = router;