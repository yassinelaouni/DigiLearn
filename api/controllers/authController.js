const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Admin = require('../models/Admin');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          balance: user.balance,
          avatar: user.avatar,
          role: user.role
        },
        token: generateToken(user._id, 'user'),
        errorCode: "",
        errorMessage: "Login successful",
        errors: {}
      });
    } else {
      res.status(401).json({
        success: false,
        user: {},
        token: "",
        errorCode: "InvalidCredentials",
        errorMessage: 'Invalid email or password',
        errors: {}
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message
    });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.json({
        success: true,
        user: {
          id: admin._id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          avatar: admin.avatar
        },
        token: generateToken(admin._id, 'admin'),
        errorCode: "",
        errorMessage: "Admin login successful",
        errors: {}
      });
    } else {
      res.status(401).json({
        success: false,
        user: {},
        token: "",
        errorCode: "InvalidCredentials",
        errorMessage: 'Invalid admin credentials',
        errors: {}
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message
    });
  }
};

exports.userRegister = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        user: {},
        token: "",
        errorCode: "UserExists",
        errorMessage: 'User with this email already exists',
        errors: {}
      });
    }

    const user = await User.create({
      email,
      password,
      firstName,
      lastName
    });

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        createdAt: user.createdAt
      },
      token: generateToken(user._id, 'user'),
      errorCode: "",
      errorMessage: "Registration successful",
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