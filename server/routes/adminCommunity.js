const express = require('express');
const { isAdminLogedIn } = require('../middlewares/authMiddleware');
const { getCommunity, blockCommunity, unblockCommunity } = require('../controller/adminCommunity')
const router = express.Router();

router.get('/', isAdminLogedIn, getCommunity)
router.put('/block/:id', isAdminLogedIn, blockCommunity)
router.put('/unblock/:id', isAdminLogedIn, unblockCommunity)

module.exports = router;