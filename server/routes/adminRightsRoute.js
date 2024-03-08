const express = require('express');
const { isAdminLogedIn } = require('../middlewares/authMiddleware');
const { getRights, postRights } = require('../controller/adminRights')
const router = express.Router();

router.get('/', isAdminLogedIn, getRights)
router.post('/', isAdminLogedIn, postRights)
module.exports = router;