const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const Certificate = require('../models/Certificate');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate({
        path: 'modules',
        populate: {
          path: 'lessons'
        }
      })
      .populate({
        path: 'quiz',
        populate: {
          path: 'questions'
        }
      });

    const coursesWithRelations = courses.map(course => {
      // Get all lessons (both direct and through modules)
      const moduleLessons = course.modules.flatMap(module => module.lessons);
      const directLessons = course.lessons || [];
      const allLessons = [...moduleLessons, ...directLessons];

      return {
        ...course._doc,
        modules: course.modules,
        lessons: allLessons,
        quiz: course.quiz
      };
    });

    res.json({
      success: true,
      courses: coursesWithRelations,
      errorCode: "",
      errorMessage: "",
      errors: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message
    });
  }
};

// Get course by slug
exports.getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });

    if (!course) {
      return res.status(404).json({
        success: false,
        course: null,
        errorCode: "CourseNotFound",
        errorMessage: "Course not found",
        errors: {}
      });
    }

    const modules = await Module.find({ courseId: course._id })
      .sort('order')
      .populate('lessons');

    const courseWithModules = {
      ...course._doc,
      modules: modules.map(module => {
        const lessons = module.lessons.map(lesson => {
          // Base lesson object with all common fields
          const baseLesson = {
            ...lesson._doc,
            moduleId: module._id,
            courseId: course._id
          };

          // Handle reading lessons
          if (lesson.type === 'reading') {
            return {
              ...baseLesson,
              readingContent: lesson.readingContent || 'Default reading content...',
              pdfUrl: lesson.pdfUrl || "https://www.cs.cmu.edu/afs/cs.cmu.edu/user/gchen/www/download/java/LearnJava.pdf"
            };
          }

          // Handle video lessons
          if (lesson.type === 'video') {
            return {
              ...baseLesson,
              videoUrl: lesson.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            };
          }

          return baseLesson;
        });

        return {
          ...module._doc,
          lessons
        };
      })
    };

    res.json({
      success: true,
      course: courseWithModules,
      errorCode: "",
      errorMessage: "",
      errors: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message
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
        featured: course.featured
      })),
      errorCode: "",
      errorMessage: "",
      errors: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message
    });
  }
};

// Create course
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      course: {
        ...course._doc,
        lessons: [],
        quiz: null
      },
      errorCode: "",
      errorMessage: "",
      errors: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message
    });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('modules')
      .populate('lessons')
      .populate('quiz');

    res.json({
      success: true,
      course,
      errorCode: "",
      errorMessage: "",
      errors: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message
    });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    // Delete related lessons, modules, quizzes, certificates, etc.
    // (Implementation depends on your cascade delete requirements)
    
    await Course.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      errorCode: "",
      errorMessage: "",
      errors: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message
    });
  }
};

// Get course lessons
exports.getCourseLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ courseId: req.params.courseId });

    res.json({
      success: true,
      lessons,
      errorCode: "",
      errorMessage: "",
      errors: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message
    });
  }
};

// Get suggested courses (for a user)
exports.getSuggestedCourses = async (req, res) => {
  try {
    const userId = req.query.userId;

    // 1. Get user's completed course IDs (if userId exists)
    const completedCourseIds = userId 
      ? await Certificate.distinct('courseId', { userId })
      : [];

    // 2. Find all non-completed courses (limit to 3)
    const suggestedCourses = await Course.find({
      _id: { $nin: completedCourseIds }
    })
    .select('title slug thumbnail category level duration')
    .limit(3)
    .lean();

    return res.json({
      success: true,
      courses: suggestedCourses
    });

  } catch (err) {
    console.error('Error in getSuggestedCourses:', err);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch suggested courses"
    });
  }
};
