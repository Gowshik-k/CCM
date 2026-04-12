const express = require('express');
const router = express.Router();
const { getDepartmentComplaints, updateDepartmentComplaint } = require('../controllers/departmentController');
const { protect } = require('../middlewares/authMiddleware');

// Protect all department routes
router.use(protect);

router.get('/:name', getDepartmentComplaints);
router.put('/update/:id', updateDepartmentComplaint);

module.exports = router;
