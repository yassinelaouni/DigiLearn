const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
  updateAvatar,
  updateFirstName,
  updateLastName,
  updatePassword,
  getProfile,
} = require('../controllers/userController');

router.patch('/users/update/avatar', protect, updateAvatar);
router.patch('/users/update/firstName', protect, updateFirstName);
router.patch('/users/update/lastName', protect, updateLastName);
router.patch('/users/update/password', protect, updatePassword);
router.get('/users/get/profile', protect, getProfile);

module.exports = router;