const express = require('express');
const router = express.Router();
const { getQuiz } = require('../controllers/quizController');

router.get('/quiz', getQuiz);

module.exports = router;