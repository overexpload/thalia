const express = require('express');
const router = express.Router();
const adminRightsRoute = require('./adminRightsRoute')
router.use('/rights',adminRightsRoute)
module.exports = router;