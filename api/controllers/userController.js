const User = require('../models/User');
const Certificate = require('../models/Certificate');
const UserProgress = require('../models/UserProgress');
const Course = require('../models/Course');

// Update user avatar
exports.updateAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        updated: {},
        errorCode: 'UserNotFound',
        errorMessage: `User with ID ${req.user.id} not found`,
        errors: {},
      });
    }

    user.avatar = req.body.avatar;
    await user.save();

    res.json({
      success: true,
      updated: { avatar: user.avatar, userId: user._id },
      errorCode: '',
      errorMessage: 'Avatar updated successfully',
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

// Update user firstName
exports.updateFirstName = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        updated: {},
        errorCode: 'UserNotFound',
        errorMessage: `User with ID ${req.user.id} not found`,
        errors: {},
      });
    }

    user.firstName = req.body.firstName;
    await user.save();

    res.json({
      success: true,
      updated: { firstName: user.firstName, userId: user._id },
      errorCode: '',
      errorMessage: 'First name updated successfully',
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

// Update user lastName
exports.updateLastName = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        updated: {},
        errorCode: 'UserNotFound',
        errorMessage: `User with ID ${req.user.id} not found`,
        errors: {},
      });
    }

    user.lastName = req.body.lastName;
    await user.save();

    res.json({
      success: true,
      updated: { lastName: user.lastName, userId: user._id },
      errorCode: '',
      errorMessage: 'Last name updated successfully',
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

// Update user password
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        updated: {},
        errorCode: 'UserNotFound',
        errorMessage: `User with ID ${req.user.id} not found`,
        errors: {},
      });
    }

    user.password = req.body.password;
    await user.save();

    res.json({
      success: true,
      updated: { userId: user._id },
      errorCode: '',
      errorMessage: 'Password updated successfully',
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

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        user: {},
        errorCode: 'UserNotFound',
        errorMessage: `User with ID ${req.user.id} not found`,
        errors: {},
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
      },
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
      UserProgress.find({ userId: req.params.userId, completed: true }),
      Course.find().populate({
        path: 'modules',
        populate: {
          path: 'lessons'
        }
      })
    ]);

    const recentCourses = allCourses.slice(0, 2).map(course => {
      const courseLessons = course.modules.flatMap(module => module.lessons);
      const completedLessons = courseLessons.filter(lesson => 
        userProgress.some(progress => progress.lessonId.equals(lesson._id))
      );

      return {
        id: course._id,
        title: course.title,
        slug: course.slug,
        thumbnail: course.thumbnail,
        progress: completedLessons.length,
        total: courseLessons.length
      };
    });

    res.json({
      success: true,
      data: {
        name: `${user.firstName} ${user.lastName}`,
        stats: {
          tutorialsCompleted: certificates.length,
          quizzesTaken: 0, // You'll need a Quiz model for this
          lessonsCompleted: userProgress.length
        },
        recentCourses
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: "Server error"
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