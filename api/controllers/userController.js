const User = require('../models/User');

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