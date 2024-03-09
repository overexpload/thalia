const express = require('express');
const { isAdminLogedIn } = require('../middlewares/authMiddleware');
const { getRights, postRights, updateRight, deleteRight } = require('../controller/myRights')
const router = express.Router();

router.get('/', isAdminLogedIn, getRights)
router.post('/', isAdminLogedIn, postRights)
router.put('/:id', isAdminLogedIn, updateRight)
router.delete('/:id', isAdminLogedIn, deleteRight)
module.exports = router;