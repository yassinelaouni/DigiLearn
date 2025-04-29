const express = require('express');
const router = express.Router();
const { getCourseBySlug, getFeaturedCourses } = require('../controllers/courseController');

router.get('/courses/:slug', getCourseBySlug);
router.get('/courses/featured', getFeaturedCourses);

module.exports = router;