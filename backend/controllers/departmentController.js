const Complaint = require('../models/Complaint');

// @desc    Get complaints assigned to a specific department
// @route   GET /api/department/:name
// @access  Department user
const getDepartmentComplaints = async (req, res) => {
    try {
        const { name } = req.params;

        // We expect the name to match the department map (e.g., "Academic Affairs")
        // URL decoding handled by express automatically, but we can verify that matching string exists.
        const complaints = await Complaint.find({ department: name }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: complaints.length,
            data: complaints,
        });
    } catch (error) {
        console.error('Error fetching department complaints:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Update complaint status and add resolution note
// @route   PUT /api/department/update/:id
// @access  Department user
const updateDepartmentComplaint = async (req, res) => {
    try {
        const { status, resolutionNote } = req.body;
        const { id } = req.params;

        let updateFields = {};
        if (status) updateFields.status = status;
        if (resolutionNote) updateFields.resolutionNote = resolutionNote;

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
        console.error('Error updating complaint by department:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = {
    getDepartmentComplaints,
    updateDepartmentComplaint,
};
