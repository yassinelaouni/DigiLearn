const { Course, Module, Lesson, Quiz, Question, Certificate } = require('../models');
const slugify = require('slugify');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate({
        path: 'quiz',
        model: 'Quiz',
        select: 'title description questions',
        populate: {
          path: 'questions',
          model: 'Question',
          select: 'question options correctAnswer feedback'
        }
      })
      .populate({
        path: 'modules',
        model: 'Module',
        select: 'title order lessons duration',
        populate: {
          path: 'lessons',
          model: 'Lesson',
          select: 'title videoUrl duration order content type readingContent pdfUrl'
        }
      })
      .sort({ createdAt: -1 })
      .lean();

    if (!courses.length) {
      return res.status(200).json({
        success: true,
        courses: [],
        message: 'No courses found'
      });
    }

    const processedCourses = courses.map(course => ({
      ...course,
      id: course._id,
      quiz: course.quiz ? {
        ...course.quiz,
        id: course.quiz._id,
        questions: course.quiz.questions?.map(q => ({
          ...q,
          id: q._id
        })) || []
      } : null,
      modules: course.modules?.map(module => ({
        ...module,
        id: module._id,
        lessons: module.lessons?.map(lesson => ({
          ...lesson,
          id: lesson._id
        })) || []
      })) || []
    }));

    res.status(200).json({
      success: true,
      count: processedCourses.length,
      courses: processedCourses
    });

  } catch (err) {
    console.error('Error fetching courses:', err);
    
    let statusCode = 500;
    let errorMessage = 'Failed to load course data';
    
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      statusCode = 400;
      errorMessage = 'Invalid data format';
    } else if (err.name === 'MissingSchemaError') {
      errorMessage = 'Database configuration error';
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
    const course = await Course.findOne({ slug: req.params.slug })
      .populate({
        path: 'quiz',
        model: 'Quiz',
        select: 'title description questions',
        populate: {
          path: 'questions',
          model: 'Question',
          select: 'question options correctAnswer feedback'
        }
      })
      .populate({
        path: 'modules',
        model: 'Module',
        select: 'title order lessons',
        populate: {
          path: 'lessons',
          model: 'Lesson',
          select: 'title videoUrl duration order type readingContent pdfUrl'
        }
      })
      .lean();

    if (!course) {
      return res.status(404).json({
        success: false,
        course: null,
        errorCode: "CourseNotFound",
        errorMessage: "Course not found",
        errors: {}
      });
    }

    const processedCourse = {
      ...course,
      id: course._id,
      quiz: course.quiz ? {
        ...course.quiz,
        id: course.quiz._id,
        questions: course.quiz.questions?.map(q => ({
          ...q,
          id: q._id
        })) || []
      } : null,
      modules: course.modules?.map(module => ({
        ...module,
        id: module._id,
        lessons: module.lessons?.map(lesson => ({
          ...lesson,
          id: lesson._id,
          videoUrl: lesson.type === 'video' ? (lesson.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ') : undefined,
          readingContent: lesson.type === 'reading' ? (lesson.readingContent || 'Default reading content...') : undefined,
          pdfUrl: lesson.type === 'reading' ? (lesson.pdfUrl || "https://www.cs.cmu.edu/afs/cs.cmu.edu/user/gchen/www/download/java/LearnJava.pdf") : undefined
        })) || []
      })) || []
    };

    res.status(200).json({
      success: true,
      course: processedCourse,
      errorCode: "",
      errorMessage: "",
      errors: {}
    });
  } catch (err) {
    console.error('Error fetching course by slug:', err);
    
    let statusCode = 500;
    let errorMessage = 'Failed to load course data';
    
    if (err.name === 'CastError') {
      statusCode = 400;
      errorMessage = 'Invalid course slug format';
    }
    
    res.status(statusCode).json({
      success: false,
      errorMessage,
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Get all featured courses
exports.getFeaturedCourses = async (req, res) => {
  console.log('Fetching featured courses...');
  try {
    const featuredCourses = await Course.find({ featured: true })
      .select('title slug category thumbnail rating duration level featured')
      .lean();

    const processedCourses = featuredCourses.map(course => ({
      ...course,
      id: course._id
    }));

    res.status(200).json({
      success: true,
      count: processedCourses.length,
      courses: processedCourses,
      errorCode: "",
      errorMessage: "",
      errors: {}
    });
  } catch (err) {
    console.error('Error fetching featured courses:', err);
    res.status(500).json({
      success: false,
      errorMessage: 'Server error while fetching featured courses',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.title) {
      updateData.slug = slugify(updateData.title, { lower: true, strict: true });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate({
        path: 'quiz',
        model: 'Quiz',
        populate: {
          path: 'questions',
          model: 'Question'
        }
      })
      .populate({
        path: 'modules',
        model: 'Module',
        populate: {
          path: 'lessons',
          model: 'Lesson'
        }
      })
      .lean();

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        errorMessage: 'Course not found'
      });
    }

    const processedCourse = {
      ...updatedCourse,
      id: updatedCourse._id,
      quiz: updatedCourse.quiz ? {
        ...updatedCourse.quiz,
        id: updatedCourse.quiz._id,
        questions: updatedCourse.quiz.questions?.map(q => ({
          ...q,
          id: q._id
        })) || []
      } : null,
      modules: updatedCourse.modules?.map(module => ({
        ...module,
        id: module._id,
        lessons: module.lessons?.map(lesson => ({
          ...lesson,
          id: lesson._id
        })) || []
      })) || []
    };

    res.status(200).json({
      success: true,
      course: processedCourse,
      message: 'Course updated successfully'
    });
  } catch (err) {
    console.error('Error updating course:', err);
    
    let statusCode = 500;
    let errorMessage = 'Failed to update course';
    
    if (err.name === 'ValidationError') {
      statusCode = 400;
      errorMessage = 'Validation error: ' + err.message;
    } else if (err.name === 'CastError') {
      statusCode = 400;
      errorMessage = 'Invalid course ID format';
    }
    
    res.status(statusCode).json({
      success: false,
      errorMessage,
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // First find the course to get related data
    const course = await Course.findById(id)
      .select('modules quiz')
      .lean();

    if (!course) {
      return res.status(404).json({
        success: false,
        errorMessage: 'Course not found'
      });
    }

    // Delete all related data (cascade delete)
    await Promise.all([
      Module.deleteMany({ _id: { $in: course.modules || [] } }),
      Lesson.deleteMany({ courseId: id }),
      Quiz.deleteMany({ _id: course.quiz || null }),
      Certificate.deleteMany({ courseId: id })
    ]);

    // Finally delete the course
    await Course.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Course and all related data deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting course:', err);
    
    let statusCode = 500;
    let errorMessage = 'Failed to delete course';
    
    if (err.name === 'CastError') {
      statusCode = 400;
      errorMessage = 'Invalid course ID format';
    }
    
    res.status(statusCode).json({
      success: false,
      errorMessage,
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Get course lessons
exports.getCourseLessons = async (req, res) => {
  try {
    const { courseId } = req.params;

    const lessons = await Lesson.find({ courseId })
      .sort('order')
      .lean();

    const processedLessons = lessons.map(lesson => ({
      ...lesson,
      id: lesson._id,
      videoUrl: lesson.type === 'video' ? (lesson.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ') : undefined,
      readingContent: lesson.type === 'reading' ? (lesson.readingContent || 'Default reading content...') : undefined,
      pdfUrl: lesson.type === 'reading' ? (lesson.pdfUrl || "https://www.cs.cmu.edu/afs/cs.cmu.edu/user/gchen/www/download/java/LearnJava.pdf") : undefined
    }));

    res.status(200).json({
      success: true,
      count: processedLessons.length,
      lessons: processedLessons
    });
  } catch (err) {
    console.error('Error fetching course lessons:', err);
    
    let statusCode = 500;
    let errorMessage = 'Failed to load lessons';
    
    if (err.name === 'CastError') {
      statusCode = 400;
      errorMessage = 'Invalid course ID format';
    }
    
    res.status(statusCode).json({
      success: false,
      errorMessage,
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
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
    .select('title slug thumbnail category level duration rating')
    .limit(3)
    .lean();

    const processedCourses = suggestedCourses.map(course => ({
      ...course,
      id: course._id
    }));

    res.status(200).json({
      success: true,
      count: processedCourses.length,
      courses: processedCourses
    });
  } catch (err) {
    console.error('Error in getSuggestedCourses:', err);
    res.status(500).json({
      success: false,
      errorMessage: 'Failed to fetch suggested courses',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Create course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, duration, level } = req.body;
    let learningOutcomes = [];
    
    // Handle learning outcomes
    if (req.body.learningOutcomes) {
      learningOutcomes = Array.isArray(req.body.learningOutcomes) 
        ? req.body.learningOutcomes
        : Object.values(req.body)
            .filter(val => typeof val === 'string' && val.startsWith('learningOutcomes['))
            .map(val => val.split(']=')[1]);
    }

    // Handle file upload
    let thumbnail = 'defaults/course-thumbnail.jpg';
    if (req.file) {
      thumbnail = `/uploads/${req.file.filename}`;
    }

    const slug = slugify(title, { lower: true, strict: true });

    const course = await Course.create({
      title,
      slug,
      description,
      category,
      duration,
      level,
      thumbnail,
      learningOutcomes
    });

    const processedCourse = {
      ...course.toObject(),
      id: course._id,
      modules: [],
      quiz: null
    };

    res.status(201).json({
      success: true,
      course: processedCourse,
      message: 'Course created successfully'
    });
  } catch (err) {
    console.error('Error creating course:', err);
    
    let statusCode = 500;
    let errorMessage = 'Failed to create course';
    
    if (err.name === 'ValidationError') {
      statusCode = 400;
      errorMessage = 'Validation error: ' + err.message;
    } else if (err.code === 11000) {
      statusCode = 400;
      errorMessage = 'Course with this title already exists';
    }
    
    res.status(statusCode).json({
      success: false,
      errorMessage,
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};