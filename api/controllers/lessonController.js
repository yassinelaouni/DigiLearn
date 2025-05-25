const Lesson = require('../models/Lesson');
const UserProgress = require('../models/UserProgress');
const Course = require('../models/Course'); // Add this import
const Module = require('../models/Module'); // Add this import if using module

// Create lesson
exports.createLesson = async (req, res) => {
  try {
    const { title, type, duration, description, moduleId, videoUrl, pdfUrl } = req.body;
    const courseId = req.params.courseId;

    // Validate based on type
    if (type === 'video' && !videoUrl) {
      return res.status(400).json({
        success: false,
        errorMessage: 'Video URL is required for video lessons'
      });
    }

    if (type === 'pdf' && !pdfUrl) {
      return res.status(400).json({
        success: false,
        errorMessage: 'PDF file is required for PDF lessons'
      });
    }

    // Calculate order position
    const order = moduleId 
      ? await Lesson.countDocuments({ moduleId })
      : await Lesson.countDocuments({ courseId });

    // Create lesson with conditional PDF URL
    const lesson = await Lesson.create({
      title,
      type,
      duration,
      description,
      videoUrl: type === 'video' ? videoUrl : null,
      pdfUrl: pdfUrl ? pdfUrl : null, // This is the modified line
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

    res.status(201).json({
      success: true,
      lesson: {
        _id: lesson._id,
        title: lesson.title,
        type: lesson.type,
        duration: lesson.duration,
        order: lesson.order,
        moduleId: lesson.moduleId,
        videoUrl: lesson.videoUrl,
        pdfUrl: lesson.pdfUrl // Add this
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
    
    // Validate required fields
    if (!req.body.title || !req.body.type || !req.body.duration) {
      return res.status(400).json({
        success: false,
        errorMessage: 'Title, type, and duration are required'
      });
    }

    const updateData = {
      title: req.body.title,
      type: req.body.type,
      duration: req.body.duration,
      description: req.body.description || '',
      moduleId: req.body.moduleId || null,
      pdfUrl: req.body.pdfUrl ? req.body.pdfUrl : null
    };

    // Keep existing PDF URL if not provided in update
    if (!req.body.pdfUrl) delete updateData.pdfUrl;

    // Handle video URL if it's a video lesson
    if (req.body.type === 'video') {
      updateData.videoUrl = req.body.videolr1;
      updateData.pdfUrl = null; // Clear PDF if changing to video
    }

    // Handle PDF upload if it's a PDF lesson
    if (req.body.type === 'pdf' && req.file) {
      updateData.pdfUrl = `/uploads/pdfs/${req.file.filename}`;
      updateData.videoUrl = null; // Clear video if changing to PDF
    }

    const updatedLesson = await Lesson.findOneAndUpdate(
      { _id: lessonId, courseId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedLesson) {
      return res.status(404).json({
        success: false,
        errorMessage: 'Lesson not found'
      });
    }

    res.json({
      success: true,
      lesson: updatedLesson,
      errorCode: "",
      errorMessage: "",
      errors: {}
    });

  } catch (err) {
    console.error('Update lesson error:', err);
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
    console.log(`Attempting to delete lesson ${lessonId} from course ${courseId}`);

    // First verify the lesson belongs to the course
    const course = await Course.findById(courseId).populate('modules');
    if (!course) {
      console.log('Course not found');
      return res.status(404).json({
        success: false,
        errorMessage: 'Course not found'
      });
    }

    // Check if lesson exists
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      console.log('Lesson not found');
      return res.status(404).json({
        success: false,
        errorMessage: 'Lesson not found'
      });
    }

    // Verify lesson belongs to this course
    if (lesson.courseId.toString() !== courseId) {
      console.log('Lesson does not belong to this course');
      return res.status(400).json({
        success: false,
        errorMessage: 'Lesson does not belong to this course'
      });
    }

    console.log('Deleting associated user progresses...');
    // Delete associated progresses first
    await UserProgress.deleteMany({ lessonId });

    console.log('Finding module containing lesson...');
    // Find module containing this lesson
    let moduleContainingLesson = null;
    for (const module of course.modules) {
      if (module.lessons.includes(lessonId)) {
        moduleContainingLesson = module;
        break;
      }
    }

    console.log('Deleting lesson document...');
    // Then delete the lesson
    await Lesson.findByIdAndDelete(lessonId);

    console.log('Updating course/module references...');
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

    console.log('Lesson deleted successfully');
    res.json({
      success: true,
      message: 'Lesson deleted successfully'
    });
  } catch (err) {
    console.error('Delete lesson error:', err);
    res.status(500).json({
      success: false,
      errorMessage: 'Server error during lesson deletion',
      detailedError: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};