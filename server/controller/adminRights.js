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
 * @desc request for creating rights
 * @route POST /api/admin/rights
 * @access private
 */
const postRights = async (req, res, next) => {
    try {
        const { name, content } = req.body;
        if (!name || !content) {
            res.status(400);
            throw new Error('Details missing')
        }
        const newRight = await new Rights({
            name, content
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

/**
 * @desc request for updating rights
 * @route PUT /api/admin/rights/:id
 * @access private
 */
const updateRight = async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400)
            throw new Error('Right not found')
        }
        const right = await Rights.findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body } }, { new: true })
        if (right) {
            res.status(200).json({
                success: true,
                message: 'right updated successfully',
                right
            })
        } else {
            throw new Error('Internal server error')
        }
    } catch (error) {
        next(error.message);
    }
}

/**
 * @desc request for deleting rights
 * @route delete /api/admin/rights/:id
 * @access private
 */
const deleteRight = async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400)
            throw new Error('Right not found')
        }
        await Rights.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({
            success: true,
            message: 'right deleted successfully'
        })
    } catch (error) {
        next(error.message);
    }
}

module.exports = {
    getRights,
    postRights,
    updateRight,
    deleteRight
}