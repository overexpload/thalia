const Members = require('../models/membersModel')
const Community = require('../models/communityModel')

/**
 * @desc request for create new community
 * @route POST /api/community
 * @access public
 */

const createCommunity = async (req, res, next) => {
    try {
        const { community_name } = req.body;
        if (!community_name) {
            res.status(400);
            throw new Error('community name not found');
        }
        const newCommunity = await new Community(req.body).save()
        if (newCommunity) {
            const members = await new Members({
                community_id: newCommunity._id,
                user_id: req.user?._id,
                is_admin: true
            }).save()
            res.status(201).json({
                success: true,
                message: "new community created",
                newCommunity,
                members
            })
        } else {
            throw new Error("Internal server error")
        }
    } catch (error) {
        next(error.message)
    }
}

/**
 * @desc request for fetching suggestions
 * @route POST /api/community/get-suggestions
 * @access private
 */

const getSuggestions = async (req, res, next) => {
    try {
        const community = await Community.aggregate([
            {
                $match: {
                    is_delete: false,
                }
            },
            {
                $lookup: {
                    from: "members",
                    localField: "_id",
                    foreignField: "community_id",
                    as: "members"
                }
            },
            {
                $match: {
                    "members.user_id": {
                        $nin: [req.user._id] // Exclude communities where req.user._id is present in members.user_id
                    }
                }
            }
        ])

        res.status(200).json({
            success: true,
            message: 'community suggestions fetched',
            community
        })
    } catch (error) {
        next(error.message)
    }
}

/**
 * @desc request for joining a community
 * @route POST /api/community/join
 * @access private
 */

const joinCommunity = async (req, res, next) => {
    try {
        const { community_id } = req.body;
        if (!community_id) {
            res.status(400);
            throw new Error('Invalid community');
        }
        const community = await Community.findOne({ _id: community_id })
        if (!community) {
            res.status(400);
            throw new Error('Invalid community');
        }
        const exist = await Members.findOne({ community_id: community._id, user_id: req.user?._id });
        if (exist) {
            res.status(400);
            throw new Error('You are already a member')
        }
        const member = await new Members({
            community_id: community._id,
            user_id: req.user?._id,
            status: community.privacy === 'public' ? 'active' : 'pending'
        }).save()
        res.status(200).json({
            success: true,
            message: 'add join request',
            community,
            member
        })
    } catch (error) {
        next(error.message)
    }
}

/**
 * @desc request for accepting a join request
 * @route POST /api/community/accept-join
 * @access private
 */

const acceptJoin = async (req, res, next) => {
    try {
        const { community_id } = req.body;
        if (!community_id) {
            res.status(400);
            throw new Error('Invalid community');
        }
        const community = await Community.findOne({ _id: community_id })
        if (!community) {
            res.status(400);
            throw new Error('Invalid community');
        }
        const member = await Members.findOneAndUpdate({ community_id: community_id, user_id: req.user?._id }, { $set: { status: 'active' } }, { new: true });
        if (member) {
            res.status(200).json({
                success: true,
                message: 'accept join request',
                member
            })
        }
    } catch (error) {
        next(error.message)
    }
}

/**
 * @desc request for fetching my communities
 * @route GET /api/community/my-communities
 * @access private
 */

const getmyCommunities = async (req, res, next) => {
    try {
        const community = await Community.aggregate([
            {
                $match: {
                    is_delete: false,
                }
            },
            {
                $lookup: {
                    from: "members",
                    localField: "_id",
                    foreignField: "community_id",
                    as: "members"
                }
            },
            {
                $match: {
                    "members.user_id": {
                        $in: [req.user._id] // Exclude communities where req.user._id is present in members.user_id
                    }
                }
            }
        ])

        res.status(200).json({
            success: true,
            message: 'my community fetched',
            community
        })
    } catch (error) {
        next(error.message)
    }
}

module.exports = {
    createCommunity,
    getSuggestions,
    joinCommunity,
    acceptJoin,
    getmyCommunities
}