const User = require('../models/userModel')
const Profile = require('../models/profileModel')
const generateUsername = require('../utils/generateUsername')
const generateToken = require('../utils/generateToken')

/**
 * @desc request for sign in 
 * @route POST /api/signup
 * @access public
 */
const signup = async (req, res, next) => {
    try {
        const { email, password, fullname } = req.body;
        if (!email || !password || !fullname) {
            throw new Error('Missing credentials')
        }
        const exist = await User.findOne({ email: email });
        if (exist) {
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

const verifyMail = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error.message);
    }
}


module.exports = {
    signup,
    verifyMail
}

