// const Members = require('../models/membersModel')
const Community = require('../models/communityModel')

/**
 * @desc request for fetching all community
 * @route GET /api/admin/community
 * @access private
 */

const getCommunity = async (req, res, next) => {
    try {
        const community = await Community.aggregate([
            {
                $lookup: {
                    from: "members",
                    localField: "_id",
                    foreignField: "community_id",
                    as: "members"
                }
            }
        ])
        res.status(200).json({
            success: true,
            message: "all communities fetched",
            community
        })
    } catch (error) {
        next(error.message);
    }
}

/**
 * @desc request for blocking community
 * @route PUT /api/admin/community/block/:id
 * @access private
 */

const blockCommunity = async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400);
            throw new Error('invalid community id');
        }
        const community = await Community.findOneAndUpdate({ _id: req.params.id }, { $set: { id_delete: true } }, { new: true })
        res.status(200).json({
            success: true,
            message: "community blocked",
            community
        })
    } catch (error) {
        next(error.message);
    }
}

/**
 * @desc request for unblocking community
 * @route PUT /api/admin/community/unblock/:id
 * @access private
 */

const unblockCommunity = async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400);
            throw new Error('invalid community id');
        }
        const community = await Community.findOneAndUpdate({ _id: req.params.id }, { $set: { id_delete: false } }, { new: true })
        res.status(200).json({
            success: true,
            message: "community unblocked",
            community
        })
    } catch (error) {
        next(error.message);
    }
}

module.exports = {
    getCommunity,
    blockCommunity,
    unblockCommunity
}