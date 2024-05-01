const express = require('express');
const router = express.Router();
const attemptService = require('../services/AttemptService');
const { sendResponse, sendError } = require('../middleware/responseHandler');

// Create a new attempt
router.post('/', async (req, res) => {
    try {
        const userId = req.user.user_id;
        const attemptData = req.body;
        attemptData.user_id = userId;
        attemptData.timestamp = new Date();
        const attempt = await attemptService.createAttempt(req.body);
        sendResponse(res, 201, attempt);
    } catch (error) {
        sendError(res, error);
    }
});

// Get all attempts
router.get('/', async (req, res) => {
    try {
        const attempts = await attemptService.getAllAttempts();
        sendResponse(res, 200, attempts);
    } catch (error) {
        sendError(res, error);
    }
});

// Get attempts for authenticated user
router.get('/me', async (req, res) => {
    try {
        const userId = req.user.user_id;
        const attempts = await attemptService.getAttemptsByUserId(userId);
        sendResponse(res, 200, attempts);
    } catch (error) {
        sendError(res, error);
    }
});

module.exports = router;
