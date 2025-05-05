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

// Public routes
router.get('/courses', getAllCourses);
router.get('/courses/featured', getFeaturedCourses);
router.get('/courses/:slug', getCourseBySlug);
router.get('/courses/:courseId/lessons', getCourseLessons);

// Admin protected routes
router.post('/courses',  createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id',  deleteCourse);

module.exports = router;