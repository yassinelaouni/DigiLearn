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
router.get('/:id', getCertificateById);

// User protected routes
router.post('/issue', issueCertificate);
router.get('/users/:userId/certificates',  getUserCertificates); 

// Admin protected routes
router.get('/admin/certificates', getAllCertificates);
router.patch('/admin/certificates/verify/:certificateId', adminVerifyCertificate);

module.exports = router;