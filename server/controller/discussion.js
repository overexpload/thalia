const Discussion = require("../models/discussionModel")

/**
 * @desc function creating discussion
 * @route POST /api/community/discussions
 * @access private
 */
const createDiscussion = async (req, res, next) => {
    const { content, community_id, user_id } = req.body;
    if (!content || !community_id || !user_id) {
        res.status(400);
        return next(new Error('Invalid details'));
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
                status: 'created',
                message: 'new discussion added',
                discussion: discussion[0]
            })
        }
    }

}

/**
 * @desc function discussions of a community
 * @route GET /api/community/discussions/:id
 * @access private
 */

const getDiscussions = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        res.status(400);
        return next(new Error('community not found'))
    }

    const discussions = await Discussion.aggregate([
        {
            $match: {
                community_id: new ObjectId(id),
                is_delete: false
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            skip: (page - 1) * 10
        },
        {
            $limit: 10
        },
        {
            $lookup: {
                from: "comments",
                localField: '_id',
                foreignField: 'post_id',
                as: "comments",
            }
        },
        {
            $lookup: {
                from: "userprofiles",
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
            status: 'ok',
            message: 'discussion fetched',
            discussions
        })
    } else {
        next(new Error('Internal server error'))
    }
}
)

// /**
//  * @desc requst for recent discussions of a community
//  * @route GET /api/community/discussions/recent
//  * @access private
//  */
// export const getRecentDiscussion: RequestHandler = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         const page = (req.query.page && typeof (req.query.page) === "string") ? req.query.page : null
//         const pageSize = 3;
//         const query = page ? {
//             createdAt: { $lt: new Date(page) }
//         } : {}

//         const community = await Members.find({ user_id: req.user?._id, status: 'active' })
//         const communityId = community.map((item) => item.community_id);

//         const discussions = await Discussion.aggregate([
//             {
//                 $match: {
//                     community_id: { $in: communityId },
//                     is_delete: false
//                 }
//             },
//             {
//                 $sort: {
//                     createdAt: -1
//                 }
//             },
//             {
//                 $match: query
//             },
//             {
//                 $limit: pageSize
//             },
//             {
//                 $lookup: {
//                     from: "comments",
//                     localField: '_id',
//                     foreignField: 'post_id',
//                     as: "comments",
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "userprofiles",
//                     localField: 'user_id',
//                     foreignField: 'user_id',
//                     as: 'userProfile',
//                     pipeline: [
//                         {
//                             $lookup: {
//                                 from: "users",
//                                 localField: 'user_id',
//                                 foreignField: '_id',
//                                 as: 'user',
//                             }
//                         },
//                         {
//                             $unwind: {
//                                 path: '$user'
//                             }
//                         },
//                         {
//                             $project: {
//                                 username: 1,
//                                 profile_img: 1,
//                                 fullname: 1,
//                                 user_id: 1,
//                                 verified: 1,
//                                 email: '$user.email'
//                             }
//                         }
//                     ]
//                 }
//             },
//             {
//                 $unwind: {
//                     path: '$userProfile'
//                 }
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     content: 1,
//                     user_id: 1,
//                     likes: 1,
//                     community_id: 1,
//                     content_type: 1,
//                     file_type: 1,
//                     caption: 1,
//                     is_delete: 1,
//                     createdAt: 1,
//                     userProfile: 1,
//                     comments: { $size: "$comments" },
//                 }
//             }
//         ])


//         if (discussions) {
//             res.status(200).json({
//                 status: 'ok',
//                 message: 'discussion fetched',
//                 discussions
//             })
//         } else {
//             next(new Error('Internal server error'))
//         }
//     }
// )

// /**
//  * @desc function for deleting a discussions 
//  * @route DELETE /api/community/discussions/:id
//  * @access private
//  */
// export const deleteDiscussion: RequestHandler = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         const { id } = req.params;
//         if (!id) {
//             res.status(400);
//             return next(new Error('discussion not found'))
//         }
//         const deletedDiscussion = await Discussion.findOneAndUpdate({ _id: id }, { $set: { is_delete: true } }, { new: true })
//         if (deletedDiscussion) {
//             res.status(200).json({
//                 status: 'ok',
//                 message: 'discussion deleted',
//                 deletedDiscussion
//             })
//         } else {
//             next(new Error('Internal server error'))
//         }
//     }
// )

// /**
//  * @desc function for like a discussions 
//  * @route DELETE /api/community/discussions/like/:id
//  * @access private
//  */
// export const likeDiscussion: RequestHandler = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         const { id } = req.params;
//         if (!id) {
//             res.status(400);
//             return next(new Error('discussion not found'))
//         }
//         const likedDiscussion = await Discussion.findOneAndUpdate({ _id: id }, { $addToSet: { likes: req.user?._id } }, { new: true })
//         if (likedDiscussion) {
//             res.status(200).json({
//                 status: 'ok',
//                 message: 'discussion liked',
//                 likedDiscussion
//             })
//         } else {
//             next(new Error('Internal server error'))
//         }
//     }
// )

// /**
//  * @desc function for dislike a discussions 
//  * @route DELETE /api/community/discussions/dislike/:id
//  * @access private
//  */
// export const dislikeDiscussion: RequestHandler = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         const { id } = req.params;
//         if (!id) {
//             res.status(400);
//             return next(new Error('discussion not found'))
//         }
//         const likedDiscussion = await Discussion.findOneAndUpdate({ _id: id }, { $pull: { likes: req.user?._id } }, { new: true })
//         if (likedDiscussion) {
//             res.status(200).json({
//                 status: 'ok',
//                 message: 'discussion disliked',
//                 likedDiscussion
//             })
//         } else {
//             next(new Error('Internal server error'))
//         }
//     }
// )

// /**
//  * @desc rquest for add commment on a discussions 
//  * @route POST /api/community/discussions/comment
//  * @access private
//  */
// export const addComment: RequestHandler = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         const { discussion_id } = req.body;
//         if (!discussion_id) {
//             res.status(400)
//             return next(new Error("Invalid discussion"));
//         }
//         const newComment = await new Comment({
//             user_id: req.user?._id,
//             post_id: req.body.discussion_id,
//             content: req.body.content
//         })
//         if (req.body.reply) {
//             newComment.reply = req.body.reply
//         }
//         const comment = await newComment.save()

//         if (comment) {
//             const resComment = await Comment.aggregate([
//                 {
//                     $match: {
//                         _id: comment._id
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: 'userprofiles',
//                         localField: 'user_id',
//                         foreignField: 'user_id',
//                         as: 'user_details',
//                         pipeline: [
//                             {
//                                 $lookup: {
//                                     from: 'users',
//                                     localField: 'user_id',
//                                     foreignField: '_id',
//                                     as: "email",
//                                     pipeline: [
//                                         {
//                                             $project: {
//                                                 _id: 0,
//                                                 email: 1
//                                             }
//                                         }
//                                     ]

//                                 }
//                             },
//                             {
//                                 $unwind: {
//                                     path: "$email"
//                                 }
//                             },
//                             {
//                                 $project: {
//                                     username: 1,
//                                     profile_img: 1,
//                                     email: '$email.email'
//                                 }
//                             },

//                         ]
//                     }
//                 }, {
//                     $unwind: {
//                         path: '$user_details'
//                     }
//                 },

//             ])
//             res.status(200).json({
//                 status: 'ok',
//                 message: 'new Comment added',
//                 comment: resComment[0]
//             })
//         } else {
//             next(new Error('Internal server error'))
//         }
//     }
// )

// /**
//  * @desc rquest for fetching comments of a discussion
//  * @route GET /api/community/discussions/comment/:id
//  * @access private
//  */
// export const getComments: RequestHandler = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         const { id } = req.params;
//         if (!id) {
//             res.status(400)
//             return next(new Error("Invalid discussion"));
//         }


//         const comments = await Comment.aggregate([
//             {
//                 $match: {
//                     post_id: new ObjectId(id)
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'userprofiles',
//                     localField: 'user_id',
//                     foreignField: 'user_id',
//                     as: 'user_details',
//                     pipeline: [
//                         {
//                             $lookup: {
//                                 from: 'users',
//                                 localField: 'user_id',
//                                 foreignField: '_id',
//                                 as: "email",
//                                 pipeline: [
//                                     {
//                                         $project: {
//                                             _id: 0,
//                                             email: 1
//                                         }
//                                     }
//                                 ]

//                             }
//                         },
//                         {
//                             $unwind: {
//                                 path: "$email"
//                             }
//                         },
//                         {
//                             $project: {
//                                 username: 1,
//                                 profile_img: 1,
//                                 email: '$email.email'
//                             }
//                         },

//                     ]
//                 }
//             }, {
//                 $unwind: {
//                     path: '$user_details'
//                 }
//             },

//         ])
//         if (comments) {
//             res.status(200).json({
//                 status: 'ok',
//                 message: 'comments fetched',
//                 comment: comments
//             })
//         } else {
//             next(new Error('Internal server error'))
//         }
//     }
// )

// /**
//  * @desc rquest for fetching replyies of comment
//  * @route GET /api/community/discussions/comment/reply/:id
//  * @access private
//  */
// export const getReplyCommemts: RequestHandler = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         const { id } = req.params;
//         if (!id) {
//             res.status(400)
//             return next(new Error("Invalid comment"));
//         }


//         const comments = await Comment.aggregate([
//             {
//                 $match: {
//                     reply: new ObjectId(id)
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'userprofiles',
//                     localField: 'user_id',
//                     foreignField: 'user_id',
//                     as: 'user_details',
//                     pipeline: [
//                         {
//                             $lookup: {
//                                 from: 'users',
//                                 localField: 'user_id',
//                                 foreignField: '_id',
//                                 as: "email",
//                                 pipeline: [
//                                     {
//                                         $project: {
//                                             _id: 0,
//                                             email: 1
//                                         }
//                                     }
//                                 ]

//                             }
//                         },
//                         {
//                             $unwind: {
//                                 path: "$email"
//                             }
//                         },
//                         {
//                             $project: {
//                                 username: 1,
//                                 profile_img: 1,
//                                 email: '$email.email'
//                             }
//                         },

//                     ]
//                 }
//             }, {
//                 $unwind: {
//                     path: '$user_details'
//                 }
//             },

//         ])
//         if (comments) {
//             res.status(200).json({
//                 status: 'ok',
//                 message: 'reply comment fetched',
//                 comment: comments
//             })
//         } else {
//             next(new Error('Internal server error'))
//         }
//     }
// )


// /**
//  * @desc rquest for add commment on a discussions 
//  * @route DELETE /api/community/discussions/comment
//  * @access private
//  */
// export const deleteComment: RequestHandler = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         const { id } = req.params;
//         if (!id) {
//             res.status(400)
//             return next(new Error("Invalid comment"));
//         }
//         const deletedComment = await Comment.findOneAndDelete({ _id: id })
//         if (deletedComment) {
//             res.status(200).json({
//                 status: 'ok',
//                 message: 'comment deleted',
//                 deletedComment
//             })
//         } else {
//             next(new Error('Internal server error'))
//         }
//     }
// )


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
    createDiscussion
}