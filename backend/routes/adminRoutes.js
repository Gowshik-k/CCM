const express = require('express');
const router = express.Router();
const { getComplaints, updateStatus, overrideComplaint } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Protect all admin routes
router.use(protect);
router.use(admin);

router.get('/complaints', getComplaints);
router.put('/update-status/:id', updateStatus);
router.put('/override/:id', overrideComplaint);

module.exports = router;
