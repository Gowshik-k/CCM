const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // Auto-select: true for 465, false for 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Send an email notification to department staff.
 * @param {string} to - Recipient email
 * @param {Object} data - Complaint data
 */
const sendNewComplaintNotification = async (to, data) => {
    const { complaintId, title, priority, department, description } = data;

    const mailOptions = {
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_USER}>`, // Using SMTP_USER for Gmail compatibility
        to,
        subject: `[New Complaint] - ${priority} Priority: ${title}`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #1e293b;">New Grievance Submitted</h2>
                <p>A new complaint has been automatically routed to your department <strong>(${department})</strong>.</p>
                
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6; margin: 20px 0;">
                    <p><strong>Complaint ID:</strong> ${complaintId}</p>
                    <p><strong>Title:</strong> ${title}</p>
                    <p><strong>Priority:</strong> <span style="color: ${priority === 'High' ? '#ef4444' : priority === 'Medium' ? '#f59e0b' : '#10b981'}">${priority}</span></p>
                    <p><strong>Description:</strong></p>
                    <p style="font-style: italic; color: #475569;">"${description}"</p>
                </div>

                <p>Please log in to the <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard" style="color: #3b82f6; text-decoration: none; font-weight: bold;">Staff Dashboard</a> to review and resolve this task.</p>
                
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                <p style="font-size: 12px; color: #94a3b8;">This is an automated notification from VocalCampus AI Core.</p>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Notification email sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending notification email:', error);
        throw error;
    }
};

module.exports = {
    sendNewComplaintNotification,
};
