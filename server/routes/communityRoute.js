const express = require('express');
const { isLogedIn } = require('../middlewares/authMiddleware');
const router = express.Router();
const { createCommunity, getSuggestions,joinCommunity } = require('../controller/community')

router.get('/get-suggestions', isLogedIn, getSuggestions)
router.post('/', isLogedIn, createCommunity)
router.post('/join', isLogedIn, joinCommunity)
module.exports = router;