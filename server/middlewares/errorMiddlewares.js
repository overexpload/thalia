
/**
 * Error response middleware for not found
 * @param {Request} req
 * @param {Response} res
 */
const notFound = (req, res) => {
    return res.status(404).json({
        success: false,
        message: "Not Found",
    });
};

/**
* Generic error response middleware for validation and internal server errors
*
* @param {any} err
* @param {Request} req
* @param {Response} res
*/

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    if (res.statusCode === 200) {
        res.status(500)
    }
    res.json({
        success: false,
        message: err || 'internal server error',
    });
};


module.exports = { notFound, errorHandler }