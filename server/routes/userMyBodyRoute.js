const express = require('express');
const { isLogedIn } = require('../middlewares/authMiddleware');
const { getContents } = require('../controller/myBody')
const router = express.Router();

router.get('/', isLogedIn, getContents)
module.exports = router;