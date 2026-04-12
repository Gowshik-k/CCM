const express = require('express');
const router = express.Router();
const { submitComplaint, trackComplaint } = require('../controllers/complaintController');

const rateLimit = require('express-rate-limit');

// Basic rate limiting for public endpoints
const publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 complaint submissions per window
    message: 'Too many complaints submitted from this IP, please try again later'
});

router.post('/', publicLimiter, submitComplaint);
router.get('/:id', trackComplaint);

module.exports = router;
