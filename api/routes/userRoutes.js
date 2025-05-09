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
router.patch('/users/update/avatar',  updateAvatar);
router.patch('/users/update/firstName', updateFirstName);
router.patch('/users/update/lastName', updateLastName);
router.patch('/users/update/password', updatePassword);
router.get('/users/get/profile',  getProfile);
router.get('/user/dashboard/:userId',  getUserDashboard);
router.get('/user/progress', getUserProgress);
router.post('/user/progress', markLessonComplete);

// Admin protected routes
router.get('/users/get/all',getAllUsers);
router.delete('/users/delete/:id',  deleteUser);
router.patch('/users/update/:id',  updateUser);

module.exports = router;