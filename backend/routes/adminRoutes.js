const express = require('express');
const router = express.Router();
const { 
    getComplaints, 
    updateStatus, 
    overrideComplaint,
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Protect all admin routes
router.use(protect);
router.use(admin);

// Complaints Management
router.get('/complaints', getComplaints);
router.put('/update-status/:id', updateStatus);
router.put('/override/:id', overrideComplaint);

// User Management
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
