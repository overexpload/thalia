const mongoose = require("mongoose");

const rightsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, { timestamps: true });


module.exports = mongoose.model("Rights", rightsSchema);