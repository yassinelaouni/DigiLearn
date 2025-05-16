const Lesson = require('../models/Lesson');
const UserProgress = require('../models/UserProgress');
const Course = require('../models/Course'); // Add this import
const Module = require('../models/Module'); // Add this import if using module

// Create lesson
exports.createLesson = async (req, res) => {
  try {
    const { title, type, duration, description, moduleId } = req.body;
    const courseId = req.params.courseId;
    
    // Use the exact property name from Postman ('videolr1')
    const videoUrl = req.body.videolr1; 

    // Validate required fields
    if (!title || !type || !duration || !videoUrl) {
      return res.status(400).json({
        success: false,
        errorMessage: 'Title, type, duration, and video URL are required'
      });
    }

    // Calculate order position
    const order = moduleId 
      ? await Lesson.countDocuments({ moduleId })
      : await Lesson.countDocuments({ courseId });

    // Create lesson with consistent property names
    const lesson = await Lesson.create({
      title,
      type,
      duration,
      description,
      videoUrl, // Now matches both schema and incoming request
      moduleId: moduleId || null,
      courseId,
      order
    });

    // Update parent course
    await Course.findByIdAndUpdate(courseId, {
      $push: { lessons: lesson._id }
    });

    // Update module if specified
    if (moduleId) {
      await Module.findByIdAndUpdate(moduleId, {
        $push: { lessons: lesson._id }
      });
    }

    // Return response matching Postman's structure
    res.status(201).json({
      success: true,
      lesson: {
        _id: lesson._id,
        title: lesson.title,
        type: lesson.type,
        duration: lesson.duration,
        order: lesson.order,
        moduleId: lesson.moduleId,
        // Include other fields your frontend expects
        videoUrl: lesson.videoUrl
      }
    });

  } catch (err) {
    console.error('Error creating lesson:', err);
    res.status(500).json({
      success: false,
      errorMessage: err.message
    });
  }
};

// Update lesson
exports.updateLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    
    // First verify the lesson belongs to the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        errorMessage: 'Course not found'
      });
    }

    // Check if lesson exists in course (either directly or in any module)
    const lessonExistsInCourse = course.lessons.includes(lessonId) || 
      course.modules.some(module => module.lessons.includes(lessonId));
    
    if (!lessonExistsInCourse) {
      return res.status(404).json({
        success: false,
        errorMessage: 'Lesson not found in this course'
      });
    }

    const lesson = await Lesson.findByIdAndUpdate(
      lessonId,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      lesson,
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

// Delete lesson
exports.deleteLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    // First verify the lesson belongs to the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        errorMessage: 'Course not found'
      });
    }

    // Check if lesson exists in course (either directly or in any module)
    const moduleContainingLesson = course.modules.find(module => 
      module.lessons.includes(lessonId));

    // Delete associated progresses first
    await UserProgress.deleteMany({ lessonId });

    // Then delete the lesson
    await Lesson.findByIdAndDelete(lessonId);

    // Remove lesson reference from course or module
    if (moduleContainingLesson) {
      await Module.findByIdAndUpdate(moduleContainingLesson._id, {
        $pull: { lessons: lessonId }
      });
    } else {
      await Course.findByIdAndUpdate(courseId, {
        $pull: { lessons: lessonId }
      });
    }

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