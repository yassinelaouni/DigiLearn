const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseBySlug,
  getFeaturedCourses,
  createCourse, 
  updateCourse,
  deleteCourse,
  getCourseLessons,
  getSuggestedCourses
} = require('../controllers/courseController');
const { protect, adminProtect } = require('../middlewares/auth');

// Public routes
router.get('/courses/:courseId/lessons', getCourseLessons);
router.get('/courses/suggested', getSuggestedCourses); // <-- Now this will match first
router.get('/courses/featured', getFeaturedCourses);
router.get('/courses/:slug', getCourseBySlug); // Generic slug route last
router.get('/courses', getAllCourses);

// Admin protected routes
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id',deleteCourse);

module.exports = router;