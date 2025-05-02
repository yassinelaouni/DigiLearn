const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      errorMessage: 'Not authorized to access this route'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role === 'admin') {
      req.user = await Admin.findById(decoded.id).select('-password');
    } else {
      req.user = await User.findById(decoded.id).select('-password');
    }
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        errorMessage: 'Not authorized to access this route'
      });
    }
    
    req.user.role = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      errorMessage: 'Not authorized to access this route'
    });
  }
};

exports.adminProtect = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      errorMessage: 'Not authorized as admin to access this route'
    });
  }
  next();
};