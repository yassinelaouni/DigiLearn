const express = require('express');
const router = express.Router();
const userProgressController = require('../controllers/userProgressController');

router.get('/completion', userProgressController.checkLessonCompletion);

module.exports = router;