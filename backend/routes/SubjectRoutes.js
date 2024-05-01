const express = require('express');
const router = express.Router();
const subjectService = require('../services/SubjectService');
const { sendResponse, sendError } = require('../middleware/responseHandler');

// Get all subjects
router.get('/', async (req, res) => {
    try {
        const subjects = await subjectService.getAllSubjects();
        sendResponse(res, 200, subjects);
    } catch (error) {
        sendError(res, error);
    }
});

module.exports = router;
