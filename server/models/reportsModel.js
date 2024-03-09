const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    report_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    reporter_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    report_type: {
        type: String,
        enum: ['USER', 'COMMUNITY']
    },
    reason: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);