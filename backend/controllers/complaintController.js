const Complaint = require('../models/Complaint');
const { analyzeComplaint } = require('../utils/aiProcessor');

// @desc    Submit a new complaint
// @route   POST /api/complaint
// @access  Public
const submitComplaint = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'Please provide both title and description' });
        }

        // Process with AI
        const aiData = analyzeComplaint(description);

        let newComplaintData = {
            title,
            description,
        };

        if (aiData) {
            newComplaintData = {
                ...newComplaintData,
                ...aiData
            };
        }

        const complaint = await Complaint.create(newComplaintData);

        res.status(201).json({
            success: true,
            data: {
                complaintId: complaint.complaintId,
                message: 'Complaint submitted successfully and will be tracked via this ID.',
                priority: complaint.priority,
                department: complaint.department,
                category: complaint.category,
            }
        });

    } catch (error) {
        console.error('Error submitting complaint:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Track a complaint by its ID
// @route   GET /api/complaint/:id
// @access  Public
const trackComplaint = async (req, res) => {
    try {
        const id = req.params.id.toLowerCase();

        const complaint = await Complaint.findOne({ complaintId: id });

        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found with that ID' });
        }

        res.status(200).json({
            success: true,
            data: {
                complaintId: complaint.complaintId,
                title: complaint.title,
                status: complaint.status,
                priority: complaint.priority,
                department: complaint.department,
                resolutionNote: complaint.resolutionNote,
                createdAt: complaint.createdAt,
                updatedAt: complaint.updatedAt,
            }
        });

    } catch (error) {
        console.error('Error tracking complaint:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = {
    submitComplaint,
    trackComplaint,
};
