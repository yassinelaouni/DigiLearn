const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');

// Get course by slug
exports.getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });

    if (!course) {
      return res.status(404).json({
        success: false,
        course: null,
        errorCode: 'CourseNotFound',
        errorMessage: 'Course not found',
        errors: {},
      });
    }

    const modules = await Module.find({ courseId: course._id }).sort('order');
    
    const courseWithModules = {
      ...course._doc,
      modules: await Promise.all(modules.map(async module => {
        const lessons = await Lesson.find({ moduleId: module._id }).sort('order');
        return {
          ...module._doc,
          lessons,
        };
      })),
    };

    res.json({
      success: true,
      course: courseWithModules,
      errorCode: '',
      errorMessage: '',
      errors: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message,
    });
  }
};

// Get all featured courses
exports.getFeaturedCourses = async (req, res) => {
  try {
    const featuredCourses = await Course.find({ featured: true });

    res.json({
      success: true,
      courses: featuredCourses.map(course => ({
        id: course._id,
        title: course.title,
        slug: course.slug,
        category: course.category,
        thumbnail: course.thumbnail,
        rating: course.rating,
        duration: course.duration,
        level: course.level,
        featured: course.featured,
      })),
      errorCode: '',
      errorMessage: '',
      errors: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message,
    });
  }
};