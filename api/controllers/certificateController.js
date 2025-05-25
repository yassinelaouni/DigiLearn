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

    // Correct population using 'courseId' to match your schema
    const certificates = await Certificate.find({ userId: userId })
      .populate({
        path: 'courseId',  // This matches your schema field name
        select: 'title description',  // Only get these fields from Course
        options: { lean: true }  // Better performance
      })
      .sort({ issueDate: -1 })
      .lean();  // Convert to plain JS objects

    return res.json({
      success: true,
      certificates: certificates.map(cert => ({
        id: cert._id,
        certificateId: cert.certificateId,
        courseId: cert.courseId?._id || null,
        courseTitle: cert.courseId?.title || 'Unknown Course',
        courseDescription: cert.courseId?.description || '',
        issueDate: cert.issueDate,
        isVerified: cert.isVerified,
        score: cert.score,
        createdAt: cert.createdAt
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
    // First verify the schema fields match what we're populating
    const certificates = await Certificate.find()
      .populate({
        path: 'userId',
        select: 'firstName lastName email',
        model: 'User'
      })
      .populate({
        path: 'courseId', 
        select: 'title',
        model: 'Course'
      })
      .sort({ issueDate: -1 });

    // Transform the data for response
    const transformedCertificates = certificates.map(cert => {
      // Handle cases where population might fail
      const user = cert.userId || {};
      const course = cert.courseId || {};

      return {
        id: cert._id,
        certificateId: cert.certificateId,
        user: {
          id: user._id,
          email: user.email,
          name: user.firstName && user.lastName 
            ? `${user.firstName} ${user.lastName}`
            : 'Unknown User'
        },
        course: {
          id: course._id,
          title: course.title || 'Unknown Course'
        },
        issueDate: cert.issueDate,
        isVerified: cert.isVerified,
        score: cert.score
      };
    });

    return res.json({
      success: true,
      certificates: transformedCertificates,
      errorCode: "",
      errorMessage: "",
      errors: {}
    });

  } catch (err) {
    console.error('Error fetching all certificates:', err);
    
    // More specific error handling
    let errorMessage = "Failed to fetch certificates";
    if (err.message.includes('Cannot populate path')) {
      errorMessage = "Database configuration error - check schema references";
    }

    return res.status(500).json({
      success: false,
      errorCode: "ServerError",
      errorMessage,
      errors: process.env.NODE_ENV === 'development' ? err.message : undefined
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

    const certificate = await Certificate.findOne({ certificateId: certificateId })
      .populate('userId', 'firstName lastName')
      .populate('courseId', 'title');

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
        name: `${certificate.userId.firstName} ${certificate.userId.lastName}`,
        courseTitle: certificate.courseId.title,
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