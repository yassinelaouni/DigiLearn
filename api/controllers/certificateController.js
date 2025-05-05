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
    const certificates = await Certificate.find()
      .populate('user', 'firstName lastName email')
      .populate('course', 'title')
      .sort({ issueDate: -1 });

    return res.json({
      success: true,
      certificates: certificates.map(cert => ({
        id: cert._id,
        certificateId: cert.certificateId,
        userId: cert.user._id,
        userEmail: cert.user.email,
        userName: `${cert.user.firstName} ${cert.user.lastName}`,
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
    console.error('Error fetching all certificates:', err);
    return res.status(500).json({
      success: false,
      errorCode: "ServerError",
      errorMessage: "Failed to fetch certificates",
      errors: err.message
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
exports.getCertificateById = async (req, res) => {
  try {
    const certificateId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(certificateId)) {
      return res.status(400).json({
        success: false,
        errorCode: "InvalidIdFormat",
        errorMessage: "Invalid certificate ID format",
        errors: {}
      });
    }

    const certificate = await Certificate.findById(certificateId)
      .populate('user', 'firstName lastName')
      .populate('course', 'title');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        errorCode: "CertificateNotFound",
        errorMessage: "Certificate not found",
        errors: {}
      });
    }

    return res.json({
      success: true,
      certificate: {
        ...certificate._doc,
        name: `${certificate.user.firstName} ${certificate.user.lastName}`,
        courseTitle: certificate.course.title,
        issuer: "DIGILEARN Academy",
        title: "Course Instructor"
      },
      errorCode: "",
      errorMessage: "",
      errors: {}
    });

  } catch (err) {
    console.error('Error fetching certificate by ID:', err);
    return res.status(500).json({
      success: false,
      errorCode: "ServerError",
      errorMessage: "Failed to fetch certificate",
      errors: err.message
    });
  }
};