# 🗣️ VocalCampus AI
### Anonymous Campus Complaint Management System (MERN + AI)

VocalCampus AI is a modernized, secure, and anonymous portal designed for higher education institutions. It streamlines the lifecycle of student grievances using AI-driven categorization and a "Minimalist Premium" user experience.

---

## ✨ Features

- **🛡️ 100% Anonymous Strategy**: Built-in privacy architecture ensures students can voice concerns without fear of retaliation.
- **🤖 AI-Powered Routing**: Automatically analyzes complaint text to determine **Priority**, **Department**, and **Category** (e.g., Infrastructure vs Academic).
- **📊 Command Center**: A comprehensive Admin Dashboard with real-time analytics, filtering, and override capabilities.
- **🏢 Departmental Portal**: Task-focused interface for campus units (Maintenance, Registrar, etc.) to resolve issues.
- **🔍 Live Tracking**: Visual progress timeline for students to track their complaints in real-time.
- **🚀 Serverless Ready**: Optimized for production deployment on platforms like Vercel or AWS.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React-Toastify
- **Backend**: Node.js, Express 5, Sentiment Analysis Logic
- **Database**: MongoDB (Mongoose)
- **Deployment**: Configured for Vercel Serverless Functions

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local instance)

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file with your MONGO_URI
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📁 Repository Structure

```text
├── backend/            # Express API & AI Utilities
│   ├── config/         # Database & App Config
│   ├── controllers/    # Request Handling Logic
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Endpoints
│   └── utils/          # AI Processor (Sentiment & NLP)
├── frontend/           # Vite + React Client
│   ├── src/
│   │   ├── components/ # Reusable UI Components
│   │   ├── pages/      # Application Screens
│   │   └── services/   # API Communication Layer
└── vercel.json         # Serverless Deployment Config
```

---

## 🤝 Contributing
This project is open for enhancements! Feel free to fork and submit PRs.

**Privacy First. Campus Better.**
