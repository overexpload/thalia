const express = require('express');
const { isLogedIn } = require('../middlewares/authMiddleware');
const { getRights } = require('../controller/myRights')
const router = express.Router();

router.get('/', isLogedIn, getRights)
module.exports = router;