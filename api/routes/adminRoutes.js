const express = require('express');
const router = express.Router();
const { protect, adminProtect } = require('../middlewares/auth');
const {
  getAdminDashboardStats,
  getAdminProfile,
  updateAdminProfile
} = require('../controllers/adminController');

router.get('/admin/dashboard/stats', getAdminDashboardStats);
router.get('/admin/profile',  getAdminProfile);
router.patch('/admin/profile', updateAdminProfile);

module.exports = router;