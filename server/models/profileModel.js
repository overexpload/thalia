const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        profile_img: {
            type: String
        },
        bio: {
            type: String
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);