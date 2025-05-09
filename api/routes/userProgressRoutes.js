const express = require('express');
const router = express.Router();
const {
  getUserProgress,
  markLessonComplete,
  checkLessonCompletion
} = require('../controllers/userProgressController');

router.get('/user/progress', getUserProgress);
router.post('/user/progress', markLessonComplete);
router.get('/user/progress/completion', checkLessonCompletion);

module.exports = router;