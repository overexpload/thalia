const User = require('../models/userModel')
const generateUsername = async () => {
    const userCount = await User.countDocuments({ role: 'USER' });
    return 'user@' + (userCount + 1);
}

module.exports = generateUsername;