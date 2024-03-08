const Members = require('../models/membersModel')
const Community = require('../models/communityModel')

/**
 * @desc request for create new community
 * @route POST /api/community
 * @access public
 */

const createCommunity = async (req, res, next) => {
    try {
        const { community_name } = req.body;
        if (community_name) {
            res.status(400);
            throw new Error('community name not found');
        }
        const newCommunity = await new Community({
            ...req.body
        }).save()
        if(newCommunity){
            const members = await new Members({
                
            })
        }
    } catch (error) {
        next(error.message)
    }
}

module.exports = {
    createCommunity
}