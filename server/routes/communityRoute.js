const express = require('express');
const { isLogedIn } = require('../middlewares/authMiddleware');
const router = express.Router();

// router.get('/get-suggestions', isLogedIn, getSuggestions)
router.post('/', isLogedIn, createCommunity)
module.exports = router;