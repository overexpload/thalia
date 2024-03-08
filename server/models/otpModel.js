const mongoose = require("mongoose");

const optSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true,
    },

}, { timestamps: true });


module.exports = mongoose.model("OTP", optSchema);