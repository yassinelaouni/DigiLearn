const express = require('express');
const router = express.Router();
const { protect, adminProtect } = require('../middlewares/auth');
const {
  getAdminDashboardStats,
  getAdminProfile,
  updateAdminProfile
} = require('../controllers/adminController');

router.get('/admin/dashboard/stats', protect, adminProtect, getAdminDashboardStats);
router.get('/admin/profile', protect, adminProtect, getAdminProfile);
router.patch('/admin/profile', protect, adminProtect, updateAdminProfile);

module.exports = router;