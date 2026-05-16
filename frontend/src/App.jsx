import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import SubmitComplaint from './pages/SubmitComplaint';
import TrackComplaint from './pages/TrackComplaint';
import StaffDashboard from './pages/StaffDashboard';
import UserManagement from './pages/UserManagement';
import Login from './pages/Login';
import TaskManagement from './pages/TaskManagement';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';


// Sidebar and Navbar components have been moved to standalone files.


const AppContent = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDashboard = location.pathname.startsWith('/dashboard');
  
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen bg-white flex flex-col ${isDashboard ? 'md:flex-row' : ''} font-inter`}>
      {isDashboard ? (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      ) : (
        <Navbar />
      )}
      
      {isDashboard && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-30">
          <NavLink to="/" className="font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-black text-[10px]">VC</div>
            <span>VocalCampus</span>
          </NavLink>
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-400 hover:text-slate-800 transition-colors border border-slate-100 rounded shadow-sm">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
          </button>
        </div>
      )}
      
      <main className={`flex-grow overflow-x-hidden ${isDashboard ? 'w-full md:overflow-y-auto h-screen' : ''}`}>
        <div className={`max-w-7xl mx-auto px-4 md:px-10 ${isDashboard ? 'py-8' : 'py-2 md:py-4'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<SubmitComplaint />} />
            <Route path="/track" element={<TrackComplaint />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <StaffDashboard />
              </ProtectedRoute>
            } />

            <Route path="/dashboard/users" element={
              <ProtectedRoute adminOnly>
                <UserManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/tasks" element={
              <ProtectedRoute>
                <TaskManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={<Navigate to="/dashboard" replace />} />
            <Route path="/department" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
      <ToastContainer hideProgressBar autoClose={3000} />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
