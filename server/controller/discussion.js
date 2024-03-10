const Discussion = require("../models/discussionModel");
const Members = require("../models/membersModel");
const Comment = require("../models/commentModel");
const mongoose = require('mongoose')

/**
 * @desc function creating discussion
 * @route POST /api/community/discussions
 * @access private
 */
const createDiscussion = async (req, res, next) => {
    try {
        const { content, community_id, user_id } = req.body;
        if (!content || !community_id || !user_id) {
            res.status(400);
            throw new Error('details missing')
        }
        const newDiscussion = await new Discussion(req.body).save()
        if (newDiscussion) {
            const discussion = await Discussion.aggregate([
                {
                    $match: {
                        _id: newDiscussion._id
                    }
                },
                {
                    $lookup: {
                        from: "profiles",
                        localField: 'user_id',
                        foreignField: 'user_id',
                        as: 'userProfile',
                        pipeline: [
                            {
                                $lookup: {
                                    from: "users",
                                    localField: 'user_id',
                                    foreignField: '_id',
                                    as: 'user',
                                }
                            },
                            {
                                $unwind: {
                                    path: '$user'
                                }
                            },
                            {
                                $project: {
                                    username: 1,
                                    profile_img: 1,
                                    fullname: 1,
                                    user_id: 1,
                                    email: '$user.email'
                                }
                            }
                        ]
                    }
                },
                {
                    $unwind: {
                        path: '$userProfile'
                    }
                }
            ])
            if (discussion) {
                res.status(200).json({
                    success: true,
                    message: 'new discussion added',
                    discussion: discussion[0]
                })
            }
        }
    } catch (error) {
        next(error.message)
    }

}

/**
 * @desc function discussions of a community
 * @route GET /api/community/discussions/:id
 * @access private
 */

const getDiscussions = async (req, res, next) => {
    try {
        const { id } = req.params;
        const page = req.query.page;
        if (!id) {
            res.status(400);
            throw new Error("community not found")
        }
        if (!page) {
            res.status(400);
            throw new Error("page not found")
        }


        const discussions = await Discussion.aggregate([
            {
                $match: {
                    community_id: new mongoose.Types.ObjectId(id),
                    is_delete: false
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $skip: (page - 1) * 10
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: "comments",
                    localField: '_id',
                    foreignField: 'discussion_id',
                    as: "comments",
                }
            },
            {
                $lookup: {
                    from: "profiles",
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'userProfile',
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: 'user_id',
                                foreignField: '_id',
                                as: 'user',
                            }
                        },
                        {
                            $unwind: {
                                path: '$user'
                            }
                        },
                        {
                            $project: {
                                username: 1,
                                profile_img: 1,
                                fullname: 1,
                                user_id: 1,
                                email: '$user.email'
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: '$userProfile'
                }
            },
            {
                $project: {
                    _id: 1,
                    content: 1,
                    user_id: 1,
                    likes: 1,
                    community_id: 1,
                    content_type: 1,
                    file_type: 1,
                    caption: 1,
                    is_delete: 1,
                    createdAt: 1,
                    userProfile: 1,
                    comments: { $size: "$comments" },
                }
            }
        ])


        if (discussions) {
            res.status(200).json({
                success: true,
                message: 'discussion fetched',
                discussions
            })
        } else {
            throw new Error('Internal server error')
        }
    } catch (error) {
        console.log(error)
        next(error.message)

    }
}

/**
 * @desc requst for recent discussions of a community
 * @route GET /api/community/discussions/recent
 * @access private
 */
const getRecentDiscussion = async (req, res, next) => {
    try {
        const page = req.query.page
        if (!page) {
            throw new Error('pagination not found')
        }

        const community = await Members.find({ user_id: req.user?._id, status: 'active' })
        const communityId = community.map((item) => item.community_id);

        const discussions = await Discussion.aggregate([
            {
                $match: {
                    community_id: { $in: communityId },
                    is_delete: false
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $skip: (page - 1) * 10
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: "comments",
                    localField: '_id',
                    foreignField: 'discussion_id',
                    as: "comments",
                }
            },
            {
                $lookup: {
                    from: "profiles",
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'userProfile',
                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: 'user_id',
                                foreignField: '_id',
                                as: 'user',
                            }
                        },
                        {
                            $unwind: {
                                path: '$user'
                            }
                        },
                        {
                            $project: {
                                username: 1,
                                profile_img: 1,
                                fullname: 1,
                                user_id: 1,
                                verified: 1,
                                email: '$user.email'
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: '$userProfile'
                }
            },
            {
                $project: {
                    _id: 1,
                    content: 1,
                    user_id: 1,
                    likes: 1,
                    community_id: 1,
                    content_type: 1,
                    file_type: 1,
                    caption: 1,
                    is_delete: 1,
                    createdAt: 1,
                    userProfile: 1,
                    comments: { $size: "$comments" },
                }
            }
        ])
        if (discussions) {
            res.status(200).json({
                success: true,
                message: 'recent discussion fetched',
                discussions
            })
        } else {
            throw new Error('Internal server error')
        }
    } catch (error) {
        next(error.message)
    }
}

/**
 * @desc function for deleting a discussions 
 * @route DELETE /api/community/discussions/:id
 * @access private
 */
const deleteDiscussion = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400);
            throw new Error('discussion not found')
        }
        const deletedDiscussion = await Discussion.findOneAndUpdate({ _id: id }, { $set: { is_delete: true } }, { new: true })
        if (deletedDiscussion) {
            res.status(200).json({
                success: true,
                message: 'discussion deleted',
                deletedDiscussion
            })
        } else {
            throw new Error('internal server error')
        }
    } catch (error) {
        next(error.message)
    }
}

/**
 * @desc function for like a discussions 
 * @route PUT /api/community/discussions/like/:id
 * @access private
 */
const likeDiscussion = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400);
            throw new Error('discussion not found')
        }
        const likedDiscussion = await Discussion.findOneAndUpdate({ _id: id }, { $addToSet: { likes: req.user?._id } }, { new: true })
        if (likedDiscussion) {
            res.status(200).json({
                success: true,
                message: 'discussion liked',
                likedDiscussion
            })
        } else {
            throw new Error('internal server error')
        }
    } catch (error) {
        next(error.message)
    }
}

/**
 * @desc function for dislike a discussions 
 * @route PUT /api/community/discussions/dislike/:id
 * @access private
 */
const dislikeDiscussion = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400);
            throw new Error('discussion not found')
        }
        const dislikedDiscussion = await Discussion.findOneAndUpdate({ _id: id }, { $pull: { likes: req.user?._id } }, { new: true })
        if (dislikedDiscussion) {
            res.status(200).json({
                success: true,
                message: 'discussion disliked',
                dislikedDiscussion
            })
        } else {
            throw new Error('internal server error')
        }
    } catch (error) {
        next(error.message)
    }
}

/**
 * @desc rquest for add commment on a discussions 
 * @route POST /api/community/discussions/comment
 * @access private
 */
const addComment = async (req, res, next) => {
    try {
        console.log(req.body)
        const { discussion_id } = req.body;
        if (!discussion_id) {
            res.status(400)
            throw new Error('discussion not found')
        }
        const newComment = new Comment({
            user_id: req.user?._id,
            discussion_id: req.body.discussion_id,
            content: req.body.content
        })
        if (req.body.reply) {
            newComment.reply = req.body.reply
        }
        const comment = await newComment.save()

        if (comment) {
            const resComment = await Comment.aggregate([
                {
                    $match: {
                        _id: comment._id
                    }
                },
                {
                    $lookup: {
                        from: 'profiles',
                        localField: 'user_id',
                        foreignField: 'user_id',
                        as: 'user_details',
                        pipeline: [
                            {
                                $lookup: {
                                    from: 'users',
                                    localField: 'user_id',
                                    foreignField: '_id',
                                    as: "email",
                                    pipeline: [
                                        {
                                            $project: {
                                                _id: 0,
                                                email: 1
                                            }
                                        }
                                    ]

                                }
                            },
                            {
                                $unwind: {
                                    path: "$email"
                                }
                            },
                            {
                                $project: {
                                    username: 1,
                                    profile_img: 1,
                                    fullname: 1,
                                    email: '$email.email'
                                }
                            },

                        ]
                    }
                }, {
                    $unwind: {
                        path: '$user_details'
                    }
                },

            ])
            res.status(200).json({
                success: true,
                message: 'new Comment added',
                comment: resComment[0]
            })
        } else {
            throw new Error('internal server error')
        }
    } catch (error) {
        next(error.message)
    }
}

/**
 * @desc rquest for fetching comments of a discussion
 * @route GET /api/community/discussions/comment/:id
 * @access private
 */
const getComments = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400)
            throw new Error('discussion not found')
        }


        const comments = await Comment.aggregate([
            {
                $match: {
                    discussion_id: new mongoose.Types.ObjectId(id),
                    reply: { $exists: false }
                }
            },
            {
                $lookup: {
                    from: 'profiles',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'user_details',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'user_id',
                                foreignField: '_id',
                                as: "email",
                                pipeline: [
                                    {
                                        $project: {
                                            _id: 0,
                                            email: 1
                                        }
                                    }
                                ]

                            }
                        },
                        {
                            $unwind: {
                                path: "$email"
                            }
                        },
                        {
                            $project: {
                                username: 1,
                                profile_img: 1,
                                fullname: 1,
                                email: '$email.email'
                            }
                        },

                    ]
                }
            }, {
                $unwind: {
                    path: '$user_details'
                }
            },

        ])
        if (comments) {
            res.status(200).json({
                success: true,
                message: 'comments fetched',
                comment: comments
            })
        } else {
            throw new Error('Internal server error')
        }
    } catch (error) {
        next(error.message)
    }
}


/**
 * @desc rquest for fetching replyies of comment
 * @route GET /api/community/discussions/comment/reply/:id
 * @access private
 */
const getReplyCommemts = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400)
            throw new Error('comment not found')
        }


        const comments = await Comment.aggregate([
            {
                $match: {
                    reply: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'profiles',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'user_details',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'user_id',
                                foreignField: '_id',
                                as: "email",
                                pipeline: [
                                    {
                                        $project: {
                                            _id: 0,
                                            email: 1
                                        }
                                    }
                                ]

                            }
                        },
                        {
                            $unwind: {
                                path: "$email"
                            }
                        },
                        {
                            $project: {
                                username: 1,
                                fullname: 1,
                                profile_img: 1,
                                email: '$email.email'
                            }
                        },

                    ]
                }
            }, {
                $unwind: {
                    path: '$user_details'
                }
            },

        ])
        if (comments) {
            res.status(200).json({
                success: true,
                message: 'reply comment fetched',
                comment: comments
            })
        } else {
            throw new Error('Internal server error')
        }
    } catch (error) {
        next(error.message)
    }
}


/**
 * @desc rquest for add commment on a discussions 
 * @route DELETE /api/community/discussions/comment
 * @access private
 */
const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400)
            throw new Error("Invalid comment");
        }
        const deletedComment = await Comment.findOneAndDelete({ _id: id })
        if (deletedComment) {
            res.status(200).json({
                status: 'ok',
                message: 'comment deleted',
                deletedComment
            })
        } else {
            throw new Error('internal server error')
        }
    } catch (error) {
        next(error.message)
    }
}


// /**
//  * @desc rquest for add like on comment 
//  * @route PUT /api/community/discussions/comment/like/:id
//  * @access private
//  */
// export const likeComment: RequestHandler = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         const { id } = req.params;
//         if (!id) {
//             res.status(400)
//             return next(new Error("Invalid comment"));
//         }
//         const comment = await Comment.findOneAndUpdate({ _id: id }, { $addToSet: { likes: req.user?._id } }, { new: true })
//         if (comment) {
//             res.status(200).json({
//                 status: 'ok',
//                 message: 'comment liked',
//                 comment
//             })
//         } else {
//             next(new Error('Internal server error'))
//         }
//     }
// )


// /**
//  * @desc rquest for  dislike on comment 
//  * @route PUT /api/community/discussions/comment/dislike/:id
//  * @access private
//  */
// const dislikeComment = async (req, res, next) => {
//     const { id } = req.params;
//     if (!id) {
//         res.status(400)
//         return next(new Error("Invalid comment"));
//     }
//     const comment = await Comment.findOneAndUpdate({ _id: id }, { $pull: { likes: req.user?._id } }, { new: true })
//     if (comment) {
//         res.status(200).json({
//             status: 'ok',
//             message: 'comment disliked',
//             comment
//         })
//     } else {
//         next(new Error('Internal server error'))
//     }
// } 


module.exports = {
    createDiscussion,
    getDiscussions,
    getRecentDiscussion,
    deleteDiscussion,
    likeDiscussion,
    dislikeDiscussion,
    addComment,
    getComments,
    getReplyCommemts,
    deleteComment,
}