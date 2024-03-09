const User = require('../models/userModel')
const Profile = require('../models/profileModel')
const Report = require('../models/reportsModel')

/**
 * @desc request fetching all users
 * @route GET /api/users?search
 * @access private
 */
const getUsers = async (req, res, next) => {
    const search = req.query.search;
    try {
        const userList = await User.aggregate([
            {
                $match: {
                    is_blocked: false,
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
 * @desc request fetching user profile
 * @route GET /api/users/:id
 * @access private
 */
const getUserDetails = async (req, res, next) => {
    try {
        const userDetails = await Profile.findOne({ user_id: req.params.id }, { _id: 0, username: 1, fullname: 1 })
        res.status(200).json({
            success: true,
            message: "user details fetched",
            userDetails
        })
    } catch (error) {
        next(error.message)
    }
}


/**
 * @desc request for report user
 * @route GET /api/users/report
 * @access private
 */
const reportUser = async (req, res, next) => {
    try {
        const report = await new Report({
            report_id: req.body.user_id,
            reporter_id: req.user._id,
            report_type: req.body.report_type,
            reason: req.body.reason
        }).save()
        res.status(200).json({
            success: true,
            message: "new report added",
            report
        })
    } catch (error) {
        next(error.message)
    }
}

module.exports = {
    getUsers,
    getUserDetails,
    reportUser
}