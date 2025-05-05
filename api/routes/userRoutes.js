const express = require('express');
const router = express.Router();
const {
  updateAvatar,
  updateFirstName,
  updateLastName,
  updatePassword,
  getProfile,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserDashboard,
  getUserProgress,
  markLessonComplete
} = require('../controllers/userController');
const { protect, adminProtect } = require('../middlewares/auth');

// User protected routes
router.patch('/users/update/avatar', protect, updateAvatar);
router.patch('/users/update/firstName', protect, updateFirstName);
router.patch('/users/update/lastName', protect, updateLastName);
router.patch('/users/update/password', protect, updatePassword);
router.get('/users/get/profile', protect, getProfile);
router.get('/user/dashboard/:userId', protect, getUserDashboard);
router.get('/user/progress', protect, getUserProgress);
router.post('/user/progress', protect, markLessonComplete);

// Admin protected routes
router.get('/users/get/all', protect, adminProtect, getAllUsers);
router.delete('/users/delete/:id', protect, adminProtect, deleteUser);
router.patch('/users/update/:id', protect, adminProtect, updateUser);

module.exports = router;