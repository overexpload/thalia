const express = require('express');
const { isLogedIn } = require('../middlewares/authMiddleware');
const router = express.Router();
const { createCommunity, getSuggestions, joinCommunity, acceptJoin, getmyCommunities } = require('../controller/community')

router.get('/get-suggestions', isLogedIn, getSuggestions)
router.post('/', isLogedIn, createCommunity)
router.post('/join', isLogedIn, joinCommunity)
router.post('/accept-join', isLogedIn, acceptJoin)
router.get('/my-communities', isLogedIn, getmyCommunities)


//discussion

module.exports = router;