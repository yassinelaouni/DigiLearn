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

// courseRoutes.js
router.get('/:courseId/lessons', getCourseLessons);
router.get('/suggested', getSuggestedCourses);
router.get('/featured', getFeaturedCourses);
router.get('/:slug', getCourseBySlug);
router.get('/', getAllCourses);
 
// Admin protected routes
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;