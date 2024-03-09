const express = require('express');
const router = express.Router();
const adminRightsRoute = require('./adminRightsRoute')
const adminBodyRoute = require('./adminBodyRoute')
const adminCommunity = require('./adminCommunity')
router.use('/rights', adminRightsRoute)
router.use('/my-body', adminBodyRoute)
router.use('/community', adminCommunity)
module.exports = router;