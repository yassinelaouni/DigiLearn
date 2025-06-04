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

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      errorMessage: 'Email and password are required'
    });
  }

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({
        success: false,
        errorMessage: 'Invalid email or password'
      });
    }
   
    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Password comparison failed for user:', email);
      return res.status(401).json({
        success: false,
        errorMessage: 'Invalid email or password'
      });
    }

    // 4. Successful login
    const userData = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      balance: user.balance,
      avatar: user.avatar,
      role: user.role
    };
    const token = generateToken(user._id, user.role);
    console.log('Generated token:', token);

    res.json({
      success: true,
      user: userData,
      token: token,
      errorMessage: "Login successful"
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      errorMessage: 'Server error during login'
    });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      errorMessage: 'Email and password are required'
    });
  }

  try {
    // 1. Find admin by email
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      console.log('Admin not found for email:', email);
      return res.status(401).json({
        success: false,
        errorMessage: 'Invalid credentials' // Generic message for security
      });
    }

    // 2. Debugging logs (temporary)
    console.log('Admin input password:', password);
    console.log('Admin stored hash:', admin.password);
    
    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log('Admin password match:', isMatch);

    if (!isMatch) {
      console.log('Password comparison failed for admin:', email);
      return res.status(401).json({
        success: false,
        errorMessage: 'Invalid credentials'
      });
    }

    // 4. Successful login
    const adminData = {
      id: admin._id,
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
      avatar: admin.avatar,
      role: 'admin' // Explicitly setting role
    };

    res.json({
      success: true,
      user: adminData,
      token: generateToken(admin._id, 'admin'),
      errorMessage: "Admin login successful"
    });

  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({
      success: false,
      errorMessage: 'Server error during admin login'
    });
  }
};

exports.userRegister = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {

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