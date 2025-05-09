const express = require('express');
const router = express.Router();
const {
  createLesson,
  updateLesson,
  deleteLesson
} = require('../controllers/lessonController');
const { protect, adminProtect } = require('../middlewares/auth');

// Admin protected routes
router.post('/lessons',  createLesson);
router.put('/lessons/:id',  updateLesson);
router.delete('/lessons/:id', deleteLesson);

module.exports = router;