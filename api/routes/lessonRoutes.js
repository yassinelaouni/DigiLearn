const express = require('express');
const router = express.Router();
const {
  createLesson,
  updateLesson,
  deleteLesson
} = require('../controllers/lessonController');
const { protect, adminProtect } = require('../middlewares/auth');

// Admin protected routes
router.post('/lessons', protect, adminProtect, createLesson);
router.put('/lessons/:id', protect, adminProtect, updateLesson);
router.delete('/lessons/:id', protect, adminProtect, deleteLesson);

module.exports = router;