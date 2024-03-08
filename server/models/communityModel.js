const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
    community_name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    about: {
        type: String,
    },
    privacy: {
        type: 'string',
        enum: ['private', 'public'],
        default: 'public',
    },
    is_delete: {
        type: Boolean,
        default: false
    },

});


module.exports = mongoose.model("Community", communitySchema);