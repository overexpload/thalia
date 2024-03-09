const express = require('express');
const router = express.Router();
const { isAdminLogedIn } = require('../middlewares/authMiddleware');
const { getUserList, blockUser, unblockUser } = require('../controller/adminUser')

router.get('/', isAdminLogedIn, getUserList)
router.put('/block/:id', isAdminLogedIn, blockUser)
router.put('/unblock/:id', isAdminLogedIn, unblockUser)
module.exports = router;