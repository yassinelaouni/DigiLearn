const User = require('../models/User');
const Certificate = require('../models/Certificate');
const UserProgress = require('../models/UserProgress');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const mongoose = require('mongoose');
const unlinkAsync = promisify(fs.unlink);

// Helper function to process uploaded file
const processUploadedFile = async (file) => {
  if (!file) {
    throw new Error('No file uploaded');
  }
  
  // Just return the relative path where multer saved it
  return `/uploads/avatars/${file.filename}`;
};



// Get user progress
exports.markLessonComplete = async (req, res) => {
  try {
    const { userId, lessonId } = req.body;

    // Validate input
    if (!userId || !lessonId) {
      return res.status(400).json({
        success: false,
        errorMessage: "Both userId and lessonId are required"
      });
    }

    // Find or create progress record
    let progress = await UserProgress.findOneAndUpdate(
      { userId, lessonId },
      { $set: { completed: true } },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      progress: {
        lessonId: progress.lessonId,
        completed: progress.completed
      }
    });
  } catch (err) {
    console.error('Error marking lesson complete:', err);
    res.status(500).json({
      success: false,
      errorMessage: "Server error"
    });
  }
};

// Add this to your userController.js (before the exports)
exports.getUserProgress = async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        errorMessage: "User ID is required"
      });
    }

    const progress = await UserProgress.find({ userId }).select('-__v -_id -userId');
    
    res.json({
      success: true,
      progress
    });
  } catch (err) {
    console.error('Error fetching user progress:', err);
    res.status(500).json({
      success: false,
      errorMessage: "Server error"
    });
  }
};

// Update avatar controller
exports.updateAvatar = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        errorCode: "UserNotFound",
        errorMessage: "User not found"
      });
    }

    // Process the uploaded file
    const avatarUrl = `http://localhost:5000/uploads/avatars/${req.file.filename}`;

    // Update user with new avatar
    user.avatar = avatarUrl;
    await user.save();

    
    res.json({
      success: true,
      updated: { 
        avatar: avatarUrl,
        userId: user._id
      }
    });

  } catch (err) {
    console.error('Avatar update error:', err);
    res.status(500).json({
      success: false,
      errorCode: "ServerError",
      errorMessage: err.message || 'Failed to update avatar'
    });
  }
};

// Update user firstName by ID
exports.updateFirstName = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        updated: {},
        errorCode: "UserNotFound",
        errorMessage: `User not found`,
        errors: {}
      });
    }

    user.firstName = req.body.firstName;
    await user.save();

    res.json({
      success: true,
      updated: { firstName: user.firstName, userId: user._id },
      errorCode: "",
      errorMessage: "First name updated successfully",
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

// Update user lastName by ID
exports.updateLastName = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        updated: {},
        errorCode: "UserNotFound",
        errorMessage: `User not found`,
        errors: {}
      });
    }

    user.lastName = req.body.lastName;
    await user.save();

    res.json({
      success: true,
      updated: { lastName: user.lastName, userId: user._id },
      errorCode: "",
      errorMessage: "Last name updated successfully",
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

// Update user password by ID (with current password verification)
exports.updatePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        updated: {},
        errorCode: "UserNotFound",
        errorMessage: `User not found`,
        errors: {}
      });
    }

    if (!(await bcrypt.compare(req.body.currentPassword, user.password))) {
      return res.status(400).json({
        success: false,
        errorMessage: 'Current password is incorrect'
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    res.json({
      success: true,
      updated: { userId: user._id },
      errorCode: "",
      errorMessage: "Password updated successfully",
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

// Get user profile by ID (public access)
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        user: {},
        errorCode: "UserNotFound",
        errorMessage: `User not found`,
        errors: {}
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        balance: user.balance,
        avatar: user.avatar,
        role: user.role,
        createdAt: user.createdAt
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

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.json({
      success: true,
      users: users.map(user => ({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        role: user.role || 'student',
        createdAt: user.createdAt
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

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    
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

// Update user (admin only)
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      user,
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


// Get user dashboard
exports.getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        errorMessage: "User not found"
      });
    }

    const [certificates, userProgress, allCourses] = await Promise.all([
      Certificate.find({ userId: req.params.userId }),
      UserProgress.find({ userId: req.params.userId }),
      Course.find().populate({
        path: 'modules',
        populate: {
          path: 'lessons'
        }
      })
    ]);

    const processedCourses = allCourses
      .map(course => {
        const courseLessons = course.modules.flatMap(module => module.lessons);
        const totalLessons = courseLessons.length;
        const completedLessons = courseLessons.filter(lesson => 
          userProgress.some(p => p.lessonId.equals(lesson._id) && p.completed)
        ).length;
        
        const latestProgress = userProgress
          .filter(p => courseLessons.some(l => l._id.equals(p.lessonId)))
          .sort((a, b) => b.updatedAt - a.updatedAt)[0];

        return {
          id: course._id,
          title: course.title,
          slug: course.slug,
          thumbnail: course.thumbnail,
          progress: completedLessons,
          total: totalLessons,
          hasLessons: totalLessons > 0,
          isCompleted: totalLessons > 0 && completedLessons === totalLessons,
          lastAccessed: latestProgress?.updatedAt || null
        };
      })
      .filter(course => course.hasLessons && (course.progress >= 1 || course.isCompleted));

    const sortedCourses = processedCourses.sort((a, b) => {
      if (a.isCompleted && !b.isCompleted) return -1;
      if (!a.isCompleted && b.isCompleted) return 1;
      
      if (a.lastAccessed && b.lastAccessed) {
        return b.lastAccessed - a.lastAccessed;
      }
      if (a.lastAccessed) return -1;
      if (b.lastAccessed) return 1;
      
      return a.title.localeCompare(b.title);
    });

    res.json({
      success: true,
      data: {
        name: `${user.firstName} ${user.lastName}`,
        stats: {
          certificates: certificates.length,
          lessonsCompleted: userProgress.filter(p => p.completed).length,
          completedCourses: processedCourses.filter(c => c.isCompleted).length,
          totalCourses: sortedCourses.length
        },
        allCourses: sortedCourses
      }
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({
      success: false,
      errorMessage: "Server error"
    });
  }
};