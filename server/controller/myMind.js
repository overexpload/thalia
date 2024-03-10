const MyMind = require('../models/myMind')

/**
 * @desc request fetching all content
 * @route GET /api/admin/my-body?page=1&&search='aa'
 * @access private
 */
const getContents = async (req, res, next) => {
    try {
        const page = req.query.page;
        const search = req.query.search
        const count = await MyMind.countDocuments()
        const contents = await MyMind.find({ name: { $regex: new RegExp(search, 'i') } }).skip((page - 1) * 10).limit(10);
        res.status(200).json({
            success: true,
            message: 'all contents fetched',
            contents,
            count
        })
    } catch (error) {
        next(error.message);
    }
}

/**
 * @desc request for creating content
 * @route POST /api/admin/my-body
 * @access private
 */
const createContent = async (req, res, next) => {
    try {
        const { name, content } = req.body;
        if (!name || !content) {
            res.status(400);
            throw new Error('Details missing')
        }
        const newContent = await new MyMind({
            name, content
        }).save()
        if (newContent) {
            res.status(201).json({
                success: true,
                message: 'new content created successfully',
                newContent
            })
        } else {
            throw new Error('Internal server error')
        }
    } catch (error) {
        next(error.message);
    }
}

/**
 * @desc request for updating content
 * @route PUT /api/admin/my-body/:id
 * @access private
 */
const updateContent = async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400)
            throw new Error('content not found')
        }
        const content = await MyMind.findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body } }, { new: true })
        if (content) {
            res.status(200).json({
                success: true,
                message: 'content updated successfully',
                content
            })
        } else {
            throw new Error('Internal server error')
        }
    } catch (error) {
        next(error.message);
    }
}

/**
 * @desc request for deleting content
 * @route delete /api/admin/my-body/:id
 * @access private
 */
const deleteContent = async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400)
            throw new Error('Content not found')
        }
        await MyMind.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({
            success: true,
            message: 'content deleted successfully'
        })
    } catch (error) {
        next(error.message);
    }
}

module.exports = {
    getContents,
    createContent,
    updateContent,
    deleteContent
}