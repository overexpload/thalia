const express = require('express');
const { isAdminLogedIn } = require('../middlewares/authMiddleware');
const { getRights } = require('../controller/adminRights')
const router = express.Router();

router.get('/', isAdminLogedIn, getRights)
module.exports = router;