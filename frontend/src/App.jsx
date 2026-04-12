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
import ProtectedRoute from './components/ProtectedRoute';

// Classic Light Navbar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-slate-200 font-inter">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-black text-xs">
            VC
          </div>
          <span className="font-bold text-slate-900 tracking-tight">VocalCampus</span>
        </NavLink>

        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={({ isActive }) => `text-xs font-semibold ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'} transition-all`}>Home</NavLink>
          <NavLink to="/submit" className={({ isActive }) => `text-xs font-semibold ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'} transition-all`}>Submit Issue</NavLink>
          <NavLink to="/track" className={({ isActive }) => `text-xs font-semibold ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'} transition-all`}>Track Status</NavLink>
          <NavLink to="/login" className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded hover:bg-black transition-all">
            Staff Portal
          </NavLink>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-600 p-2 border border-slate-100 rounded">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-2 shadow-lg">
          <NavLink to="/" onClick={() => setIsOpen(false)} className="block text-sm font-semibold text-slate-600 px-3 py-2 rounded hover:bg-slate-50">Home</NavLink>
          <NavLink to="/submit" onClick={() => setIsOpen(false)} className="block text-sm font-semibold text-slate-600 px-3 py-2 rounded hover:bg-slate-50">Submit Issue</NavLink>
          <NavLink to="/track" onClick={() => setIsOpen(false)} className="block text-sm font-semibold text-slate-600 px-3 py-2 rounded hover:bg-slate-50">Track Status</NavLink>
          <NavLink to="/login" onClick={() => setIsOpen(false)} className="block text-center py-2 bg-slate-900 text-white text-sm font-bold rounded mt-2">Staff Portal</NavLink>
        </div>
      )}
    </nav>
  );
};

// Classic Light Sidebar
const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  return (
    <>
      <div className={`fixed inset-0 bg-slate-900/10 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 h-16 flex items-center justify-between border-b border-slate-100">
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-black text-xs">VC</div>
            <span className="font-bold text-slate-900 tracking-tight">VocalCampus</span>
          </NavLink>
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-1">
          <div className="px-3 pb-3">
            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">{user?.role} Portal</p>
          </div>
          
          <NavLink end to="/dashboard" onClick={onClose} className={({ isActive }) => `flex items-center space-x-3 px-3 py-2.5 rounded transition-all text-sm font-semibold ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
            <span>Main Dashboard</span>
          </NavLink>

          {isAdmin && (
            <NavLink to="/dashboard/users" onClick={onClose} className={({ isActive }) => `flex items-center space-x-3 px-3 py-2.5 rounded transition-all text-sm font-semibold ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
              <span>User Registry</span>
            </NavLink>
          )}
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-grow pr-2">
              <p className="text-[10px] text-slate-400 truncate font-bold uppercase tracking-tight leading-none mb-1">{user?.name}</p>
              <button onClick={logout} className="text-[10px] text-red-500 font-bold uppercase hover:text-red-700 transition-colors">Log out</button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

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
        <div className={`max-w-7xl mx-auto px-4 md:px-10 ${isDashboard ? 'py-8' : 'py-12 md:py-20'}`}>
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
