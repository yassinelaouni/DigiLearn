const Lesson = require('../models/Lesson');
const UserProgress = require('../models/UserProgress');

// Create lesson
exports.createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);

    res.status(201).json({
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

// Update lesson
exports.updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
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
    // Delete associated progresses first
    await UserProgress.deleteMany({ lessonId: req.params.id });
    
    // Then delete the lesson
    await Lesson.findByIdAndDelete(req.params.id);

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