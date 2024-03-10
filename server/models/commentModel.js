const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    discussion_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Discussion'
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    reply: {
        type: mongoose.Types.ObjectId
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);