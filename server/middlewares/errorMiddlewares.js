
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

const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode
    res.json({
        success: false,
        message: err?.message,
    });
};


module.exports = { notFound, errorHandler }