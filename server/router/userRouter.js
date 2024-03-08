const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        throw new Error('Not implemented')
    } catch (error) {
        next(error.message);
    }
})
// router.post('/')

module.exports = router;