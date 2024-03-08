

const getRights = async (req, res, next) => {
    try {
        console.log("get rights")
    } catch (error) {
        next(error.message);
    }
}

module.exports = {
    getRights
}