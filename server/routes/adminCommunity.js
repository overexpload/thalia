const express = require('express');
const { isAdminLogedIn } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/',isAdminLogedIn,)

module.exports = router;