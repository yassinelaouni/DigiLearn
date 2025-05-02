const Certificate = require('../models/Certificate');
const User = require('../models/User');
const Course = require('../models/Course');

// Issue a new certificate
exports.issueCertificate = async (req, res) => {
  try {
    const { userId, courseId, issueDate } = req.body;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({
        success: false,
        certificate: null,
        errorCode: 'NotFound',
        errorMessage: 'User or course not found',
        errors: {},
      });
    }

    const certificate = await Certificate.create({
      user: userId,
      course: courseId,
      issueDate: issueDate || new Date(),
      certificateId: `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    });

    res.status(201).json({
      success: true,
      certificate: {
        id: certificate._id,
        certificateId: certificate.certificateId,
        userId: user._id,
        courseId: course._id,
        issueDate: certificate.issueDate,
        isVerified: certificate.isVerified,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        course: {
          title: course.title,
          description: course.description,
        },
      },
      errorCode: '',
      errorMessage: 'Certificate issued successfully',
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

// Get user's certificates
exports.getUserCertificates = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        certificates: [],
        errorCode: 'UserNotFound',
        errorMessage: 'User not found',
        errors: {},
      });
    }

    const certificates = await Certificate.find({ user: userId }).populate('course');

    res.json({
      success: true,
      certificates: certificates.map(cert => ({
        id: cert._id,
        certificateId: cert.certificateId,
        courseId: cert.course._id,
        courseTitle: cert.course.title,
        issueDate: cert.issueDate,
        isVerified: cert.isVerified,
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

// Verify a certificate
exports.verifyCertificate = async (req, res) => {
  try {
    const certificateId = req.params.certificateId;
    const certificate = await Certificate.findOne({ certificateId }).populate('user').populate('course');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        certificate: null,
        errorCode: 'CertificateNotFound',
        errorMessage: 'Certificate not found',
        errors: {},
      });
    }

    res.json({
      success: true,
        certificate: {
          certificateId: certificate.certificateId,
          user: {
            firstName: certificate.user.firstName,
            lastName: certificate.user.lastName,
            email: certificate.user.email,
          },
          course: {
            title: certificate.course.title,
            description: certificate.course.description,
          },
          issueDate: certificate.issueDate,
          isVerified: certificate.isVerified,
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

  // Admin: Get all certificates
  exports.getAllCertificates = async (req, res) => {
    try {
      const certificates = await Certificate.find().populate('user').populate('course');

      res.json({
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

  // Admin: Verify a certificate
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
          errorCode: 'CertificateNotFound',
          errorMessage: 'Certificate not found',
          errors: {},
        });
      }

      res.json({
        success: true,
        certificate: {
          certificateId: certificate.certificateId,
          isVerified: certificate.isVerified,
        },
        errorCode: '',
        errorMessage: 'Certificate verified successfully',
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

  // Get certificate by ID with user and course details
exports.getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate('user', 'firstName lastName')
      .populate('course', 'title');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        errorMessage: "Certificate not found"
      });
    }

    res.json({
      success: true,
      certificate: {
        ...certificate._doc,
        name: `${certificate.user.firstName} ${certificate.user.lastName}`,
        courseTitle: certificate.course.title,
        issuer: "DIGILEARN Academy",
        title: "Course Instructor"
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorMessage: "Server error"
    });
  }
};