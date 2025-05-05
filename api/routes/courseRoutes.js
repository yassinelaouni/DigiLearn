const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseBySlug,
  getFeaturedCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseLessons
} = require('../controllers/courseController');
const { protect, adminProtect } = require('../middlewares/auth');

// Public routes
router.get('/courses', getAllCourses);
router.get('/courses/featured', getFeaturedCourses);
router.get('/courses/:slug', getCourseBySlug);
router.get('/courses/:courseId/lessons', getCourseLessons);

// Admin protected routes
router.post('/courses', protect, adminProtect, createCourse);
router.put('/courses/:id', protect, adminProtect, updateCourse);
router.delete('/courses/:id', protect, adminProtect, deleteCourse);

module.exports = router;