const Admin = require('../models/Admin');
const User = require('../models/User');
const Course = require('../models/Course');
const Certificate = require('../models/Certificate');

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

// Get admin profile
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');

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

// Update admin profile
exports.updateAdminProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        errorMessage: "Admin not found"
      });
    }

    // Verify current password if changing password
    if (newPassword && !(await bcrypt.compare(currentPassword, admin.password))) {
      return res.status(400).json({
        success: false,
        errorMessage: "Current password is incorrect"
      });
    }

    // Update admin fields
    admin.firstName = firstName || admin.firstName;
    admin.lastName = lastName || admin.lastName;
    admin.email = email || admin.email;
    
    if (newPassword) {
      admin.password = newPassword;
    }

    await admin.save();

    res.json({
      success: true,
      admin: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        avatar: admin.avatar
      },
      errorCode: "",
      errorMessage: "Profile updated successfully",
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