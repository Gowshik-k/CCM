const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const complaintSchema = new mongoose.Schema(
    {
        complaintId: {
            type: String,
            default: uuidv4,
            unique: true,
            index: true,
        },
        title: {
            type: String,
            required: [true, 'Please add a title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        category: {
            type: String,
            // Default placeholder until AI categorizes
            default: 'General',
        },
        sentimentScore: {
            type: Number,
            default: 0,
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Medium',
            index: true,
        },

        department: {
            type: String,
            default: 'General Administration',
            index: true,
        },

        status: {
            type: String,
            enum: ['Pending', 'In Progress', 'Resolved'],
            default: 'Pending',
            index: true,
        },

        resolutionNote: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Complaint', complaintSchema);
