const jwt = require('jsonwebtoken');
const { sendError } = require('../middleware/responseHandler');
const { UnauthorizedError } = require('../utils/errors');
const logger = require('../config/logger');

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7, authHeader.length); // Remove "Bearer " from the start

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                logger.error("JWT verification error: " + err.message)
                // Distinguish between different types of JWT errors
                const message = (err instanceof jwt.TokenExpiredError) ? 'Token has expired.' : 'Invalid token.';
                return sendError(res, new UnauthorizedError(message));
            }
            req.user = decoded;
            next();
        });
    } else {
        return sendError(res, new UnauthorizedError('No access token provided.'));
    }
};

module.exports = verifyToken;