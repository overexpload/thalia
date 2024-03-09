const express = require('express');
const { isLogedIn } = require('../middlewares/authMiddleware');
const router = express.Router();
const { getUsers, getUserDetails, reportUser } = require('../controller/userController')

router.get('/', isLogedIn, getUsers)
router.get('/:id', isLogedIn, getUserDetails)
router.post('/report', isLogedIn, reportUser)

module.exports = router;