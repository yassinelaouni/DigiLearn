const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Certificate = require('../models/Certificate');
const slugify = require('slugify'); // Install with: npm install slugify


// Get all courses
// Get all courses with optional filtering and pagination
exports.getAllCourses = async (req, res) => {
  try {
    // Basic query
    let query = Course.find();
    
    // Populate quiz data with selected fields
    query = query.populate({
      path: 'quiz',
      select: 'title description duration passingScore attemptsAllowed createdAt',
      populate: {
        path: 'questions',
        model: 'Question',
        select: 'question options correctAnswer feedback points questionType' // Only necessary fields
      }
    });
    
    // Populate modules and lessons
    query = query.populate({
      path: 'modules',
      select: 'title order lessons duration',
      populate: {
        path: 'lessons',
        model: 'Lesson',
        select: 'title videoUrl duration order content' // Only necessary fields
      }
    });
    
    // Optional: Add sorting (newest first)
    query = query.sort({ createdAt: -1 });
    
    // Execute the query
    const courses = await query.exec();
    
    // If no courses found (not necessarily an error)
    if (!courses || courses.length === 0) {
      return res.status(200).json({
        success: true,
        courses: [],
        message: 'No courses found'
      });
    }
    
    // Transform data for frontend
    const processedCourses = courses.map(course => {
      const courseObj = course.toObject();
      
      return {
        ...courseObj,
        id: courseObj._id,
        quiz: courseObj.quiz ? {
          ...courseObj.quiz,
          id: courseObj.quiz._id,
          questions: courseObj.quiz.questions?.map(q => ({
            ...q,
            id: q._id
          })) || []
        } : null,
        modules: courseObj.modules?.map(module => ({
          ...module,
          id: module._id,
          lessons: module.lessons?.map(lesson => ({
            ...lesson,
            id: lesson._id
          })) || []
        })) || []
      };
    });
    
    res.status(200).json({
      success: true,
      count: processedCourses.length,
      courses: processedCourses
    });
    
  } catch (err) {
    console.error('Error fetching courses:', err);
    
    // More specific error handling
    let errorMessage = 'Failed to load course data';
    let statusCode = 500;
    
    if (err.name === 'CastError') {
      errorMessage = 'Invalid data format';
      statusCode = 400;
    } else if (err.name === 'ValidationError') {
      errorMessage = 'Data validation failed';
      statusCode = 400;
    }
    
    res.status(statusCode).json({
      success: false,
      errorMessage,
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
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

// Create course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, duration, level, learningOutcomes } = req.body;

    // Generate slug from title
    const slug = slugify(title, { 
      lower: true,
      strict: true
    });

    // Handle thumbnail
    const thumbnail = req.file ? req.file.path : 'defaults/course-thumbnail.jpg';

    const courseData = {
      title,
      slug,
      category,
      thumbnail,
      duration,
      description: description || 'Course description here',
      level: level || 'Beginner',
      learningOutcomes: learningOutcomes || [],
      rating: 0 // Default rating
    };

    const course = await Course.create(courseData);

    res.status(201).json({
      success: true,
      course: {
        id: course._id,
        title: course.title,
        slug: course.slug,
        thumbnail: course.thumbnail,
        category: course.category,
        duration: course.duration,
        level: course.level,
        learningOutcomes: course.learningOutcomes,
        createdAt: course.createdAt
      }
    });
  } catch (err) {
    // Error handling
  }
};
