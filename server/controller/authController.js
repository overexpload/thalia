const User = require('../models/userModel')
const Profile = require('../models/profileModel')
const generateUsername = require('../utils/generateUsername')
const generateToken = require('../utils/generateToken')
const generateFourDigitOTP = require('../utils/generateOTP')
const sendMail = require('../config/nodemailer');
const bcrypt = require('bcrypt');
const OTP = require('../models/otpModel')

/**
 * @desc request for sign in 
 * @route POST /api/signup
 * @access public
 */
const signup = async (req, res, next) => {
    try {
        const { email, password, fullname } = req.body;
        if (!email || !password || !fullname) {
            res.status(400)
            throw new Error('Missing credentials')
        }
        const exist = await User.findOne({ email: email });
        if (exist) {
            res.status(400)
            throw new Error('Email id already exist')
        }
        const newUser = await new User({
            email, password
        }).save()
        if (!newUser) {
            throw new Error('Internal server error')
        }
        await new Profile({
            user_id: newUser._id,
            username: await generateUsername(),
            fullname
        }).save()
        const token = await generateToken(newUser.email, newUser._id)
        res.status(201).json({
            success: true,
            message: 'user registered successfully',
            user: {
                _id: newUser._id,
                email: newUser.email,
                role: newUser.role
            },
            token
        })
    } catch (error) {
        next(error.message);
    }
}

/**
 * @desc request for verifying mail
 * @route POST /api/verify-mail
 * @access public
 */
const verifyMail = async (req, res, next) => {
    try {
        if (!req.body.email) {
            res.status(400)
            throw new Error("Invalid email address")
        }
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(400)
            throw new Error("Email already exist");
        } else {
            const otp = await generateFourDigitOTP();
            const salt = await bcrypt.genSalt(10);
            const hashedOtp = await bcrypt.hash(otp.toString(), salt);
            await OTP.updateOne(
                { email: req.body.email },
                { $set: { email: req.body.email, otp: hashedOtp } },
                { upsert: true }
            );
            const mailOptions = {
                from: "sreesanjay7592sachu@gmail.com",
                to: req.body.email,
                subject: "Email verification",
                text: `Your otp for registration is ${otp}`,
            }
            sendMail(mailOptions);

            res.status(201).json({
                status: "created",
                message: "OTP send successfully",
            })
        }
    } catch (error) {
        next(error.message);
    }
}

/**
 * @desc request for verifying otp
 * @route POST /api/verify-otp
 * @access public
 */
const verifyOtp = async (req, res, next) => {
    try {
        if (!req.body.otp) {
            res.status(400)
            throw new Error('OTP not found')
        }
        const otp = await OTP.findOne({ email: req.body.email });
        if (otp) {
            const match = await bcrypt.compare(req.body.otp, otp.otp);
            if (match) {
                res.status(200).json({
                    success: true,
                    message: "otp matched",
                    matchOtp: true
                })
            } else {
                res.status(400)
                throw new Error('OTP not matched')
            }
        } else {
            res.status(404);
            throw new Error("email not found")
        }
    } catch (error) {
        next(error.message);
    }
}


module.exports = {
    signup,
    verifyMail,
    verifyOtp
}

