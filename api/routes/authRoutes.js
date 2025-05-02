const express = require('express');
const router = express.Router();
const {
  userLogin,
  adminLogin,
  userRegister
} = require('../controllers/authController');

router.post('/users/login', userLogin);
router.post('/users/admin/login', adminLogin);
router.post('/users/register', userRegister);

module.exports = router;