const express = require('express');
const { isLogedIn } = require('../middlewares/authMiddleware');
const router = express.Router();
const { createCommunity, getSuggestions, joinCommunity, acceptJoin, getmyCommunities } = require('../controller/community')
const { createDiscussion } = require('../controller/discussion')
// const { getDiscussions, createDiscussion, getRecentDiscussion, deleteDiscussion, likeDiscussion, dislikeDiscussion } = require('../controller/discussion')

router.get('/get-suggestions', isLogedIn, getSuggestions)
router.post('/', isLogedIn, createCommunity)
router.post('/join', isLogedIn, joinCommunity)
router.post('/accept-join', isLogedIn, acceptJoin)
router.get('/my-communities', isLogedIn, getmyCommunities)


//discussion
// router.get('/discussions/recent', isLogedIn, getRecentDiscussion)
// router.get('/discussions/:id', isLogedIn, getDiscussions)
router.post('/discussions', isLogedIn, createDiscussion)
// router.delete('/discussions/:id', isLogedIn, deleteDiscussion)
// router.put('/discussions/like/:id', isLogedIn, likeDiscussion)
// router.put('/discussions/dislike/:id', isLogedIn, dislikeDiscussion)
module.exports = router;