const Certificate = require('../models/Certificate');
const User = require('../models/User');
const Course = require('../models/Course');
const mongoose = require('mongoose');

// Issue a new certificate
exports.issueCertificate = async (req, res) => {
  try {
    const { userId, courseId, issueDate, score } = req.body;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        errorCode: "InvalidIdFormat",
        errorMessage: "Invalid user or course ID format",
        errors: {}
      });
    }

    const [user, course] = await Promise.all([
      User.findById(userId),
      Course.findById(courseId)
    ]);

    if (!user || !course) {
      return res.status(404).json({
        success: false,
        certificate: null,
        errorCode: "NotFound",
        errorMessage: "User or course not found",
        errors: {}
      });
    }

    // Generate unique certificate ID
    const certificateId = `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const certificate = await Certificate.create({
      user: userId,
      course: courseId,
      issueDate: issueDate || new Date(),
      certificateId,
      isVerified: false,
      score: score || null
    });

    // Update user's certificates array
    user.certificates.push(certificate._id);
    await user.save();

    // Update course's certificates array
    course.certificates.push(certificate._id);
    await course.save();

    return res.status(201).json({
      success: true,
      certificate: {
        id: certificate._id,
        certificateId: certificate.certificateId,
        userId: user._id,
        courseId: course._id,
        issueDate: certificate.issueDate,
        isVerified: certificate.isVerified,
        score: certificate.score,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        },
        course: {
          title: course.title,
          description: course.description
        }
      },
      errorCode: "",
      errorMessage: "Certificate issued successfully",
      errors: {}
    });

  } catch (err) {
    console.error('Error issuing certificate:', err);
    return res.status(500).json({
      success: false,
      errorCode: "ServerError",
      errorMessage: "Failed to issue certificate",
      errors: err.message
    });
  }
};

// Get user's certificates
exports.getUserCertificates = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        errorCode: "InvalidIdFormat",
        errorMessage: "Invalid user ID format",
        errors: {}
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        certificates: [],
        errorCode: "UserNotFound",
        errorMessage: "User not found",
        errors: {}
      });
    }

    const certificates = await Certificate.find({ user: userId })
      .populate('course', 'title description')
      .sort({ issueDate: -1 });

    return res.json({
      success: true,
      certificates: certificates.map(cert => ({
        id: cert._id,
        certificateId: cert.certificateId,
        courseId: cert.course._id,
        courseTitle: cert.course.title,
        issueDate: cert.issueDate,
        isVerified: cert.isVerified,
        score: cert.score
      })),
      errorCode: "",
      errorMessage: "",
      errors: {}
    });

  } catch (err) {
    console.error('Error fetching user certificates:', err);
    return res.status(500).json({
      success: false,
      errorCode: "ServerError",
      errorMessage: "Failed to fetch certificates",
      errors: err.message
    });
  }
};

// Verify a certificate
exports.verifyCertificate = async (req, res) => {
  try {
    const certificateId = req.params.certificateId;

    const certificate = await Certificate.findOne({ certificateId })
      .populate('user', 'firstName lastName email')
      .populate('course', 'title description');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        certificate: null,
        errorCode: "CertificateNotFound",
        errorMessage: "Certificate not found",
        errors: {}
      });
    }

    return res.json({
      success: true,
      certificate: {
        certificateId: certificate.certificateId,
        user: {
          firstName: certificate.user.firstName,
          lastName: certificate.user.lastName,
          email: certificate.user.email
        },
        course: {
          title: certificate.course.title,
          description: certificate.course.description
        },
        issueDate: certificate.issueDate,
        isVerified: certificate.isVerified,
        score: certificate.score
      },
      errorCode: "",
      errorMessage: "",
      errors: {}
    });

  } catch (err) {
    console.error('Error verifying certificate:', err);
    return res.status(500).json({
      success: false,
      errorCode: "ServerError",
      errorMessage: "Failed to verify certificate",
      errors: err.message
    });
  }
};

// Get all certificates (admin only)
exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ issueDate: -1 });
    const populatedCertificates = await Promise.all(
      certificates.map(async cert => {
        const user = await User.findById(cert.userId).select('firstName lastName email');
        const course = await Course.findById(cert.courseId).select('title');
        
        return {
          ...cert.toObject(),
          user: user || null,
          course: course || null
        };
      })
    );

    const formatted = populatedCertificates.map(cert => ({
      id: cert._id,
      certificateId: cert.certificateId,
      userId: cert.user?._id || cert.userId,
      userEmail: cert.user?.email || 'N/A',
      userName: cert.user 
        ? `${cert.user.firstName} ${cert.user.lastName}` 
        : 'User not found',
      courseId: cert.course?._id || cert.courseId,
      courseTitle: cert.course?.title || 'Course not found',
      issueDate: cert.issueDate,
      isVerified: cert.isVerified,
      score: cert.score
    }));

    return res.json({
      success: true,
      certificates: formatted
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      errorMessage: "Server error"
    });
  }
};

// Admin verify certificate
exports.adminVerifyCertificate = async (req, res) => {
  try {
    const certificateId = req.params.certificateId;

    const certificate = await Certificate.findOneAndUpdate(
      { certificateId },
      { isVerified: true },
      { new: true }
    );

    if (!certificate) {
      return res.status(404).json({
        success: false,
        certificate: null,
        errorCode: "CertificateNotFound",
        errorMessage: "Certificate not found",
        errors: {}
      });
    }

    return res.json({
      success: true,
      certificate: {
        certificateId: certificate.certificateId,
        isVerified: certificate.isVerified
      },
      errorCode: "",
      errorMessage: "Certificate verified successfully",
      errors: {}
    });

  } catch (err) {
    console.error('Error verifying certificate:', err);
    return res.status(500).json({
      success: false,
      errorCode: "ServerError",
      errorMessage: "Failed to verify certificate",
      errors: err.message
    });
  }
};

// Get certificate by ID
exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .populate('userId', 'firstName lastName email')  // Changed from 'user'
      .populate('courseId', 'title')  // Changed from 'course'
      .sort({ issueDate: -1 });

    if (!certificates.length) {
      return res.status(404).json({
        success: false,
        errorMessage: "No certificates found"
      });
    }

    const formatted = certificates.map(cert => ({
      id: cert._id,
      certificateId: cert.certificateId,
      user: cert.userId ? {
        id: cert.userId._id,
        email: cert.userId.email,
        name: `${cert.userId.firstName} ${cert.userId.lastName}`
      } : null,
      course: cert.courseId ? {
        id: cert.courseId._id,
        title: cert.courseId.title
      } : null,
      issueDate: cert.issueDate,
      isVerified: cert.isVerified,
      score: cert.score
    }));

    return res.json({ success: true, certificates: formatted });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      errorMessage: "Server error: " + err.message
    });
  }
};

exports.getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        errorMessage: "Invalid certificate ID format"
      });
    }

    const certificate = await Certificate.findById(id)
      .populate('userId', 'firstName lastName email')
      .populate('courseId', 'title');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        errorMessage: "Certificate not found"
      });
    }

    return res.json({
      success: true,
      certificate: {
        id: certificate._id,
        certificateId: certificate.certificateId,
        user: certificate.userId ? {
          id: certificate.userId._id,
          email: certificate.userId.email,
          name: `${certificate.userId.firstName} ${certificate.userId.lastName}`
        } : null,
        course: certificate.courseId ? {
          id: certificate.courseId._id,
          title: certificate.courseId.title
        } : null,
        issueDate: certificate.issueDate,
        isVerified: certificate.isVerified,
        score: certificate.score
      }
    });

  } catch (err) {
    console.error('Error in getCertificateById:', err);
    return res.status(500).json({
      success: false,
      errorMessage: "Server error: " + err.message
    });
  }
};