const express = require('express');
const router = express.Router();
const authService = require('../services/AuthService');
const { sendResponse, sendError } = require('../middleware/responseHandler');

// Initiate GitHub OAuth
router.get('/github', (req, res) => {
    res.redirect(authService.getGitHubAuthUrl());
});

// GitHub OAuth Callback
router.get('/github/callback', async (req, res) => {
    try {
        const { code } = req.query;
        const tokenData = await authService.exchangeCodeForToken(code);
        sendResponse(res, 200, tokenData);
    } catch (error) {
        sendError(res, error);
    }
});

module.exports = router;
