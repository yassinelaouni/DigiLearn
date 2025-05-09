const User = require('../models/User');
const Certificate = require('../models/Certificate');
const UserProgress = require('../models/UserProgress');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

// Update user avatar
exports.updateAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        updated: {},
        errorCode: "UserNotFound",
        errorMessage: `User not found`,
        errors: {}
      });
    }

    user.avatar = req.body.avatar;
    await user.save();

    res.json({
      success: true,
      updated: { avatar: user.avatar, userId: user._id },
      errorCode: "",
      errorMessage: "Avatar updated successfully",
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

// Update user firstName
exports.updateFirstName = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

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

// Update user lastName
exports.updateLastName = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

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

// Update user password
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

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

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

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

// Get user progress
exports.getUserProgress = async (req, res) => {
  try {
    const progress = await UserProgress.find({ userId: req.query.userId });

    res.json({
      success: true,
      progress: progress.map(p => ({
        lessonId: p.lessonId,
        completed: p.completed
      }))
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: "Server error"
    });
  }
}; 

// Mark lesson complete
exports.markLessonComplete = async (req, res) => {
  try {
    const { userId, lessonId } = req.body;

    let progress = await UserProgress.findOne({ userId, lessonId });

    if (!progress) {
      progress = await UserProgress.create({ userId, lessonId, completed: true });
    } else {
      progress.completed = true;
      await progress.save();
    }

    res.json({
      success: true,
      progress: {
        lessonId: progress.lessonId,
        completed: progress.completed
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: "Server error"
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

    // Process all courses with progress data
    const processedCourses = allCourses
      .map(course => {
        const courseLessons = course.modules.flatMap(module => module.lessons);
        const totalLessons = courseLessons.length;
        const completedLessons = courseLessons.filter(lesson => 
          userProgress.some(p => p.lessonId.equals(lesson._id) && p.completed)
        ).length;
        
        // Get latest interaction date for sorting
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
          hasLessons: totalLessons > 0, // Flag for courses with lessons
          isCompleted: totalLessons > 0 && completedLessons === totalLessons,
          lastAccessed: latestProgress?.updatedAt || null
        };
      })
      // Filter out courses with no lessons or progress < 1
      .filter(course => course.hasLessons && (course.progress >= 1 || course.isCompleted));

    // Sort courses: completed first, then by last accessed, then others
    const sortedCourses = processedCourses.sort((a, b) => {
      // Completed courses first
      if (a.isCompleted && !b.isCompleted) return -1;
      if (!a.isCompleted && b.isCompleted) return 1;
      
      // Then by last accessed date (most recent first)
      if (a.lastAccessed && b.lastAccessed) {
        return b.lastAccessed - a.lastAccessed;
      }
      if (a.lastAccessed) return -1;
      if (b.lastAccessed) return 1;
      
      // Finally by course title
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
          totalCourses: sortedCourses.length // Count of filtered courses
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