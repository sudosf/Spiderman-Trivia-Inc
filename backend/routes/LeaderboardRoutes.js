const express = require('express');
const router = express.Router();
const leaderboardService = require('../services/LeaderboardService');
const { sendResponse, sendError } = require('../middleware/responseHandler');

// Get leaderboards for authenticated user
router.get('/:subjectId', async (req, res) => {
    try {
        const leaderboards = await leaderboardService.getLeaderboardBySubjectId(req.params.subjectId);
        sendResponse(res, 200, leaderboards);
    } catch (error) {
        sendError(res, error);
    }
});

module.exports = router;
