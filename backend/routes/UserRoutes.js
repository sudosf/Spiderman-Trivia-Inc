const express = require('express');
const router = express.Router();
const userService = require('../services/UserService');
const { sendResponse, sendError } = require('../middleware/responseHandler');

// Get authenticated user
router.get('/me', async (req, res) => {
    try {
        const userId = 1; // the userId will be pulled from jwt
        const user = await userService.getUserById(userId);
        sendResponse(res, 200, user);
    } catch (error) {
        sendError(res, error);
    }
});

module.exports = router;
