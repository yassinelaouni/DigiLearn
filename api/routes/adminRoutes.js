const express = require('express');
const router = express.Router();
const { protect, adminProtect } = require('../middlewares/auth');
const { getAllUsers } = require('../controllers/userController');
const { getAllCertificates, adminVerifyCertificate } = require('../controllers/certificateController');

router.get('/users/get/all', protect, adminProtect, getAllUsers);
router.get('/admin/certificates', protect, adminProtect, getAllCertificates);
router.patch('/admin/certificates/verify/:certificateId', protect, adminProtect, adminVerifyCertificate);

module.exports = router;