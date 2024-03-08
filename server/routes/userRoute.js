const express = require('express');
const router = express.Router();
const { signup, verifyMail, verifyOtp, signin } = require('../controller/authController');
const profileRoute = require('./profileRoute')
const userRightsRoute = require('./userRightsRoute')
const userMyBodyRoute = require('./userMyBodyRoute')
//authentication
router.post('/signup', signup)
router.post('/verify-mail', verifyMail)
router.post('/verify-otp', verifyOtp)
router.post('/signin', signin)

router.use('/profile', profileRoute)
router.use('/rights', userRightsRoute)
router.use('/my-body', userMyBodyRoute)

module.exports = router;