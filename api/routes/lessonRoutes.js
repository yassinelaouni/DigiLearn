const express = require('express');
const router = express.Router();
const {
  createLesson,
  updateLesson,
  deleteLesson
} = require('../controllers/lessonController');
const { protect, adminProtect } = require('../middlewares/auth');

// Admin protected routes
router.post('/:courseId/lessons', createLesson);
router.put('/:courseId/lessons/:lessonId', updateLesson); 
router.delete('/:courseId/lessons/:lessonId', deleteLesson);

module.exports = router;