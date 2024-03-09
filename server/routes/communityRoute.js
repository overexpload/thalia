const express = require('express');
const { isLogedIn } = require('../middlewares/authMiddleware');
const router = express.Router();
const { createCommunity, getSuggestions, joinCommunity, acceptJoin, getmyCommunities } = require('../controller/community')
const { createDiscussion, getDiscussions, getRecentDiscussion, deleteDiscussion, likeDiscussion, dislikeDiscussion, addComment, getComments, getReplyCommemts,deleteComment } = require('../controller/discussion')

router.get('/get-suggestions', isLogedIn, getSuggestions)
router.post('/', isLogedIn, createCommunity)
router.post('/join', isLogedIn, joinCommunity)
router.post('/accept-join', isLogedIn, acceptJoin)
router.get('/my-communities', isLogedIn, getmyCommunities)


//discussion
router.get('/discussions/recent', isLogedIn, getRecentDiscussion)
router.get('/discussions/:id', isLogedIn, getDiscussions)
router.post('/discussions', isLogedIn, createDiscussion)
router.delete('/discussions/:id', isLogedIn, deleteDiscussion)
router.put('/discussions/like/:id', isLogedIn, likeDiscussion)
router.put('/discussions/dislike/:id', isLogedIn, dislikeDiscussion)

router.post('/discussions/comment', isLogedIn, addComment)
router.get('/discussions/comment/:id', isLogedIn, getComments)
router.get('/discussions/comment/reply/:id', isLogedIn, getReplyCommemts)
router.delete('/discussions/comment/:id', isLogedIn, deleteComment)

module.exports = router;