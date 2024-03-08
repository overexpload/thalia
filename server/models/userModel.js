const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        email: {
            true: 'string',
            required: true,
            unique: true
        },
        password: {
            true: String,
            required: true,
            unique: true
        },
        is_blocked: {
            type: Boolean,
            required: true,
            default: false,
        },
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER"
        }
    },
    { timestamps: true }
);

//hash password 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password =await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);