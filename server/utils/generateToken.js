const jwt = require('jsonwebtoken');

const TOKEN_MAX_AGE = 3 * 24 * 60 * 60;

const generateToken = async (email, id) => {
    try {
        const token = jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: TOKEN_MAX_AGE });
        if (token) {
            return Promise.resolve(token);
        } else {
            return Promise.reject(new Error('Could not generate token'));
        }
    } catch (error) {
        return Promise.reject(error);
    }

};

module.exports = generateToken;