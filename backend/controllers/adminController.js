const Complaint = require('../models/Complaint');

// @desc    Get all complaints (with filtering)
// @route   GET /api/admin/complaints
// @access  Admin (would be protected in real app)
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
// @route   PUT /api/admin/update-status/:id
// @access  Admin
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
// @route   PUT /api/admin/override/:id
// @access  Admin
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

module.exports = {
    getComplaints,
    updateStatus,
    overrideComplaint,
};
