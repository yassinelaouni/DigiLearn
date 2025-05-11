const express = require('express');
const router = express.Router();
const {
  getQuizForCourse,
  getQuizDetails,
  createQuiz,
  updateQuiz,
  deleteQuiz
} = require('../controllers/quizController');

// Public routes
router.get('/courses/:courseId/quiz', getQuizForCourse);
router.get('/:quizId/details', getQuizDetails);

// Admin protected routes
router.post('/',  createQuiz);
router.put('/:id', updateQuiz);
router.delete('/:id', deleteQuiz);

module.exports = router;