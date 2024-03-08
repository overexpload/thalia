const mongoose = require("mongoose")


const membersSchema = new mongoose.Schema({
    community_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Community'
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    status: {
        type: 'string',
        enum: ['pending', 'active', 'removed'],
        default: 'active'
    }
}, { timestamps: true });
module.exports = mongoose.model("Members", membersSchema);