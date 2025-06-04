const Admin = require('../models/Admin');
const User = require('../models/User');
const Course = require('../models/Course');
const Certificate = require('../models/Certificate');
const bcrypt = require('bcrypt');


// Get admin dashboard stats
exports.getAdminDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalCourses, totalCertificates, recentCertificates] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Certificate.countDocuments(),
      Certificate.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'firstName lastName')
        .populate('course', 'title')
    ]);

    // Count active users (users with at least one progress record)
    const activeUsers = await User.countDocuments({
      progresses: { $exists: true, $not: { $size: 0 } }
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalCourses,
        totalCertificates,
        activeUsers,
        recentCertificates: recentCertificates.map(cert => ({
          id: cert._id,
          certificateId: cert.certificateId,
          userName: `${cert.user.firstName} ${cert.user.lastName}`,
          courseTitle: cert.course.title,
          issueDate: cert.issueDate,
          isVerified: cert.isVerified
        }))
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

// TEMPORARY FIX - NOT FOR PRODUCTION
exports.getAdminProfile = async (req, res) => {
  try {
    // Temporary bypass for testing
    const adminId = req.user?.id || '6838d919cbd10b318d935b52'; // Your hardcoded admin ID
    
    const admin = await Admin.findById(adminId).select('-password -__v');

    if (!admin) {
      return res.status(404).json({
        success: false,
        errorMessage: "Admin not found"
      });
    }

    res.json({
      success: true,
      admin: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        avatar: admin.avatar,
        createdAt: admin.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message
    });
  }
};

// Update admin profile
exports.updateAdminProfile = async (req, res) => {
  try {
    // Temporary bypass for testing
    const adminId = req.user?.id || '6838d919cbd10b318d935b52';
    
    const { firstName, lastName, email, currentPassword, newPassword, confirmPassword } = req.body;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        errorMessage: "Admin not found"
      });
    }

    // Verify current password if changing password
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          errorMessage: "Current password is required to set a new password"
        });
      }

      if (!(await bcrypt.compare(currentPassword, admin.password))) {
        return res.status(400).json({
          success: false,
          errorMessage: "Current password is incorrect"
        });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          success: false,
          errorMessage: "New password and confirmation password don't match"
        });
      }

      // You might want to add password strength validation here
      if (newPassword.length < 8) {
        return res.status(400).json({
          success: false,
          errorMessage: "Password must be at least 8 characters long"
        });
      }
    }

    // Update admin fields
    admin.firstName = firstName || admin.firstName;
    admin.lastName = lastName || admin.lastName;
    admin.email = email || admin.email;
    
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(newPassword, salt);
    }

    await admin.save();

    res.json({
      success: true,
      admin: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        avatar: admin.avatar,
        createdAt: admin.createdAt
      },
      errorMessage: "Profile updated successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      errorMessage: 'Server error',
      errors: err.message
    });
  }
};