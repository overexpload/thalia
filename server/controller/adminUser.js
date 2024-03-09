const User = require('../models/userModel')
// const Profile = require('../models/profileModel')
// const Report = require('../models/reportsModel')

/**
 * @desc request fetching all users
 * @route GET /api/admin/users?search
 * @access private
 */
const getUserList = async (req, res, next) => {
    const search = req.query.search;
    try {
        const userList = await User.aggregate([
            {
                $match: {
                    role: 'USER'
                }
            },
            {
                $lookup: {
                    from: "profiles",
                    localField: '_id',
                    foreignField: "user_id",
                    as: "profile"
                }
            },
            {
                $unwind: {
                    path: '$profile'
                }
            },
            {
                $project: {
                    email: 1,
                    role: 1,
                    is_blocked: 1,
                    username: "$profile.username",
                    fullname: "$profile.fullname",
                    profile_img: "$profile.profile_img",
                    bio: "$profile.bio"
                }
            },
            {
                $lookup: {
                    from: "reports",
                    localField: '_id',
                    foreignField: "report_id",
                    as: "reports"
                }
            },
            {
                $match: {
                    $or: [
                        { username: { $regex: new RegExp(search, 'i') } },
                        { fullname: { $regex: new RegExp(search, 'i') } }
                    ],
                }
            }
        ])
        res.status(200).json({
            success: true,
            message: "users list fetched",
            userList
        })
    } catch (error) {
        next(error.message)
    }
}

/**
 * @desc request for blocking user
 * @route GET /api/admin/users/block/:id
 * @access private
 */

const blockUser = async (req, res, next) => {
    try {
        const block = await User.findOneAndUpdate({ _id: req.params.id }, { $set: { is_blocked: true } }, { new: true });
        if (block.is_blocked) {
            res.status(200).json({
                success: true,
                message: "user blocked"
            })
        } else {
            throw new Error("Internal server error")
        }
    } catch (error) {
        next(error.message)
    }
}

/**
 * @desc request for unblocking user
 * @route GET /api/admin/users/unblock/:id
 * @access private
 */

const unblockUser = async (req, res, next) => {
    try {
        const block = await User.findOneAndUpdate({ _id: req.params.id }, { $set: { is_blocked: false } }, { new: true });
        if (!block.is_blocked) {
            res.status(200).json({
                success: true,
                message: "user unblocked"
            })
        } else {
            throw new Error("Internal server error")
        }
    } catch (error) {
        next(error.message)
    }
}

module.exports = {
    getUserList,
    blockUser,
    unblockUser
}