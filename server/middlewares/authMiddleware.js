const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const isLogedIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log(token)
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = new mongoose.Types.ObjectId(decoded.id)
            const user = await User.findById({ _id: userId })
            if (!user || user.role !== 'USER') {
                throw new Error('Unauthorized user')
            } else if (user.is_blocked) {
                res.status(401)
                throw new Error('Account has been blocked')
            }
            else {
                req.user = user;
            }
            next();

        } else {
            throw new Error('Not authorized, token failed')
        }
    } catch (error) {
        console.log(error)
        res.status(401);
        next(error.message);
    }
};

const isAdminLogedIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = new mongoose.Types.ObjectId(decoded.id)
            const user = await User.findById({ _id: userId })
            if (!user || user.role !== 'ADMIN') {
                throw new Error('Unauthorized user')
            }
            else {
                req.user = user;
            }
            next();

        } else {
            throw new Error('Not authorized, token failed')
        }
    } catch (error) {
        res.status(401);
        next(error.message);
    }
};

module.exports = { isLogedIn, isAdminLogedIn }