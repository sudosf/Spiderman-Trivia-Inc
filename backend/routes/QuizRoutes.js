const express = require('express');
const router = express.Router();
const quizService = require('../services/QuizService');
const { sendResponse, sendError } = require('../middleware/responseHandler');

// Start a quiz for a specific subject
router.get('/start/:subjectId', async (req, res) => {
    try {
        const questions = await quizService.startQuiz(req.params.subjectId);
        sendResponse(res, 200, questions);
    } catch (error) {
        sendError(res, error);
    }
});

module.exports = router;
