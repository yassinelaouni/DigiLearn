const express = require('express');
const router = express.Router();
const path = require('path'); // Add this at the top
const multer = require('multer');
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

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/avatars'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// User protected routes
router.patch('/:userId/update/avatar', upload.single('avatar'), updateAvatar);
router.patch('/:userId/update/firstName', updateFirstName);
router.patch('/:userId/update/lastName', updateLastName);
router.patch('/:userId/update/password', updatePassword);
router.get('/:userId/profile', getProfile);
router.get('/dashboard/:userId', getUserDashboard);
router.get('/user/progress', getUserProgress);
router.post('/user/progress', markLessonComplete);

// Admin protected routes
router.get('/users/get/all', getAllUsers);
router.delete('/users/delete/:id', deleteUser);
router.patch('/users/update/:id', updateUser);

module.exports = router;