const mongoose = require("mongoose");

const rightsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model("Rights", rightsSchema);