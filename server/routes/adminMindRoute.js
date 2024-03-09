const express = require('express');
const { isAdminLogedIn } = require('../middlewares/authMiddleware');
const { getContents, createContent, updateContent, deleteContent } = require('../controller/myMind')
const router = express.Router();

router.get('/', isAdminLogedIn, getContents)
router.post('/', isAdminLogedIn, createContent)
router.put('/:id', isAdminLogedIn, updateContent)
router.delete('/:id', isAdminLogedIn, deleteContent)
module.exports = router;