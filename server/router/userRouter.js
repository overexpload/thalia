const express = require('express');
const router = express.Router();
const { signup, verifyMail } = require('../controller/authController');

router.post('/signup', signup)
router.post('/verify-mail', verifyMail)
// router.post('/verify-otp', verifyOtp)

module.exports = router;