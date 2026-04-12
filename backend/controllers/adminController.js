const Complaint = require('../models/Complaint');
const User = require('../models/User');

// @desc    Get all complaints (with filtering)
const getComplaints = async (req, res) => {
    try {
        const { priority, department, status } = req.query;
        let query = {};

        if (priority) query.priority = priority;
        if (department) query.department = department;
        if (status) query.status = status;

        const complaints = await Complaint.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: complaints.length,
            data: complaints,
        });
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Update complaint status
const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        if (!['Pending', 'In Progress', 'Resolved'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const complaint = await Complaint.findOneAndUpdate(
            { complaintId: id },
            { status },
            { new: true, runValidators: true }
        );

        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        res.status(200).json({
            success: true,
            data: complaint,
        });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Override AI Priority or Category
const overrideComplaint = async (req, res) => {
    try {
        const { priority, category, department } = req.body;
        const { id } = req.params;

        let updateFields = {};
        if (priority) updateFields.priority = priority;
        if (category) updateFields.category = category;
        if (department) updateFields.department = department;

        const complaint = await Complaint.findOneAndUpdate(
            { complaintId: id },
            updateFields,
            { new: true, runValidators: true }
        );

        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        res.status(200).json({
            success: true,
            data: complaint,
        });
    } catch (error) {
        console.error('Error overriding complaint:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Get all users (Staff/Managers)
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Create new staff user
const createUser = async (req, res) => {
    try {
        const { name, email, password, role, department } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
            department
        });

        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Update a user (Role/Department)
// @route   PUT /api/admin/users/:id
const updateUser = async (req, res) => {
    try {
        const { name, role, department } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.name = name || user.name;
        user.role = role || user.role;
        user.department = department || user.department;

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            data: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                department: updatedUser.department
            }
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        await user.deleteOne();
        res.status(200).json({ success: true, message: 'User removed' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = {
    getComplaints,
    updateStatus,
    overrideComplaint,
    getUsers,
    createUser,
    updateUser,
    deleteUser
};
