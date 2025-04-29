const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
  issueCertificate,
  getUserCertificates,
  verifyCertificate,
} = require('../controllers/certificateController');

router.post('/certificates/issue', protect, issueCertificate);
router.get('/users/:userId/certificates', protect, getUserCertificates);
router.get('/certificates/verify/:certificateId', verifyCertificate);

module.exports = router;