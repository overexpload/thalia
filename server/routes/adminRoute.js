const express = require('express');
const router = express.Router();
const adminRightsRoute = require('./adminRightsRoute')
const adminBodyRoute = require('./adminBodyRoute')
const adminCommunity = require('./adminCommunity')
const adminMindRoute = require('./adminMindRoute')
const adminUserRoute = require('./adminUserRoute')
router.use('/rights', adminRightsRoute)
router.use('/my-body', adminBodyRoute)
router.use('/my-mind', adminMindRoute)
router.use('/community', adminCommunity)
router.use('/users', adminUserRoute)
module.exports = router;