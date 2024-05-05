const express = require('express');
const router = express.Router();
const authService = require('../services/AuthService');
const { sendError } = require('../middleware/responseHandler');

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

// Initiate GitHub OAuth
router.get('/github', (req, res) => {
    res.redirect(authService.getGitHubAuthUrl());
});

// GitHub OAuth Callback
router.get('/github/callback', async (req, res) => {
    try {
        const { code } = req.query;
        const tokenData = await authService.exchangeCodeForToken(code);
        const token = encodeURIComponent(tokenData.access_token);
        const username = encodeURIComponent(tokenData.username);
        const url = `${FRONTEND_ORIGIN}/callback.html#token=${token}&username=${username}`;
        res.redirect(url);
    } catch (error) {
        sendError(res, error);
    }
});

module.exports = router;
