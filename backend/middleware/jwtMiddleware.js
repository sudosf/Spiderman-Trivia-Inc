const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const { sendError } = require('../middleware/responseHandler');
const { BadRequestError,UnauthorizedError  } = require('../utils/errors');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return sendError(res,new UnauthorizedError('No token provided.'))
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (ex) {
        sendError(res,new BadRequestError('Invalid token.'))
    }
};

module.exports = verifyToken;
