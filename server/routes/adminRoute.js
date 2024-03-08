const express = require('express');
const router = express.Router();
const adminRightsRoute = require('./adminRightsRoute')
const adminBodyRoute = require('./adminBodyRoute')
router.use('/rights', adminRightsRoute)
router.use('/my-body', adminBodyRoute)
module.exports = router;