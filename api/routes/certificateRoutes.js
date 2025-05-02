const express = require('express');
const router = express.Router();
const {
  issueCertificate,
  getUserCertificates,
  verifyCertificate,
  getAllCertificates,
  adminVerifyCertificate,
  getCertificateById
} = require('../controllers/certificateController');
const { protect, adminProtect } = require('../middlewares/auth');

// Public route
router.get('/certificates/verify/:certificateId', verifyCertificate);
router.get('/certificates/:id', getCertificateById);

// User protected routes
router.post('/certificates/issue', protect, issueCertificate);
router.get('/users/:userId/certificates', protect, getUserCertificates);

// Admin protected routes
router.get('/admin/certificates', protect, adminProtect, getAllCertificates);
router.patch('/admin/certificates/verify/:certificateId', protect, adminProtect, adminVerifyCertificate);

module.exports = router;