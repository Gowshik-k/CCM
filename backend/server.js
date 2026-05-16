const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const connectDB = require('./config/db.js');
const rateLimit = require('express-rate-limit');


// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security & Optimization Middlewares
app.use(helmet()); 
app.use(compression()); 
app.use(express.json());

// Global Rate Limiter
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', globalLimiter);

// Strict Rate Limiter for Complaint Submissions (Prevent Spam)
const complaintLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 complaints per hour
    message: { error: 'Submission limit reached. Please wait an hour before lodging another grievance.' }
});
app.use('/api/complaint', complaintLimiter);


// CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || '*', // Restrict this in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Route imports
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const adminRoutes = require('./routes/adminRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/complaint', complaintRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/department', departmentRoutes);

// Health Check & Base Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.send('VocalCampus AI API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

// Start Server (Compatible with Railway, Render, etc.)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export the app (Optional, for serverless)
module.exports = app;
