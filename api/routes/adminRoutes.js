const express = require('express');
const router = express.Router();
const { protect, adminProtect } = require('../middlewares/auth');
const {
  getAdminDashboardStats,
  getAdminProfile,
  updateAdminProfile
} = require('../controllers/adminController');

router.get('/dashboard/stats', getAdminDashboardStats);
router.get('/profile', getAdminProfile);
router.patch('/profile', updateAdminProfile);

module.exports = router;