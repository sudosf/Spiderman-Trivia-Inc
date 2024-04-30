// Handle successful responses
function sendResponse(res, statusCode, data, message = null) {
    const response = {
        status: 'success',
        message,
        data
    };
    // Filter out null or undefined values to clean up the response
    Object.keys(response).forEach(key => {
        if (response[key] === null || response[key] === undefined) {
            delete response[key];
        }
    });
    res.status(statusCode).json(response);
}

// Handle error responses
function sendError(res, error) {
    const response = {
        status: 'error',
        message: error.message|| 'Internal server error'
    };
    res.status(error.statusCode || 500).json(response);
}

module.exports = {
    sendResponse,
    sendError
};
