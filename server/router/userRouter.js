const express = require('express');
const router = express.Router();
const { signup, verifyMail, verifyOtp, signin } = require('../controller/authController');


router.post('/signup', signup)
router.post('/verify-mail', verifyMail)
router.post('/verify-otp', verifyOtp)
router.post('/signin', signin)

module.exports = router;