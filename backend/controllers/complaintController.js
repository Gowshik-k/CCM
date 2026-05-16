const Complaint = require('../models/Complaint');
const User = require('../models/User');
const { analyzeComplaint } = require('../utils/aiProcessor');
const { sendNewComplaintNotification } = require('../utils/emailService');


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

        // Notify Department Staff and Admins via Email (Async)
        try {
            // Find both department-specific staff AND all admins
            const relevantUsers = await User.find({ 
                $or: [
                    { department: complaint.department },
                    { role: 'admin' }
                ]
            });
            
            const recipientEmails = relevantUsers.map(user => user.email).filter(Boolean);
            
            if (recipientEmails.length > 0) {
                // Join emails into a comma-separated string for Nodemailer
                const to = recipientEmails.join(', ');
                
                sendNewComplaintNotification(to, {
                    complaintId: complaint.complaintId,
                    title: complaint.title,
                    priority: complaint.priority,
                    department: complaint.department,
                    description: complaint.description
                }).catch(err => console.error('Delayed email sending failed:', err));
            } else {
                console.warn(`No recipients found for complaint ${complaint.complaintId} (Dept: ${complaint.department})`);
            }
        } catch (emailError) {
            console.error('Failed to initiate email notification:', emailError);
        }

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
