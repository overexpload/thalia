const Rights = require('../models/rightsModel')

/**
 * @desc request fetching all rights
 * @route GET /api/admin/rights
 * @access private
 */
const getRights = async (req, res, next) => {
    try {
        const rights = await Rights.find();
        res.status(200).json({
            success: true,
            message: 'all rights fetched',
            rights
        })
    } catch (error) {
        next(error.message);
    }
}

/**
 * @desc request creating rights
 * @route POST /api/admin/rights
 * @access private
 */
const postRights = async (req, res, next) => {
    try {
        const { name, discription, image } = req.body;
        if (!name || !discription || !image) {
            res.status(400);
            throw new Error('Details missing')
        }
        const newRight = await new Rights({
            name, discription, image
        }).save()
        if (newRight) {
            res.status(201).json({
                success: true,
                message: 'new rights created successfully',
                newRight
            })
        } else {
            throw new Error('Internal server error')
        }
    } catch (error) {
        next(error.message);
    }
}

module.exports = {
    getRights,
    postRights
}