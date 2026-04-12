import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import SubmitComplaint from './pages/SubmitComplaint';
import TrackComplaint from './pages/TrackComplaint';
import AdminDashboard from './pages/AdminDashboard';
import DepartmentDashboard from './pages/DepartmentDashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Top Navbar for Public Pages
const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <span className="font-black text-xl text-slate-900 tracking-tight">VocalCampus</span>
        </NavLink>

        <div className="hidden md:flex items-center space-x-10">
          <NavLink to="/" className={({ isActive }) => `text-[10px] font-bold uppercase tracking-[0.2em] ${isActive ? 'text-blue-600' : 'text-slate-400 hover:text-blue-600'} transition-all`}>Home</NavLink>
          <NavLink to="/submit" className={({ isActive }) => `text-[10px] font-bold uppercase tracking-[0.2em] ${isActive ? 'text-blue-600' : 'text-slate-400 hover:text-blue-600'} transition-all`}>Submit Issue</NavLink>
          <NavLink to="/track" className={({ isActive }) => `text-[10px] font-bold uppercase tracking-[0.2em] ${isActive ? 'text-blue-600' : 'text-slate-400 hover:text-blue-600'} transition-all`}>Track Status</NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <NavLink to="/login" className="px-6 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95">
            Staff Portal
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

// Sidebar for Dashboard Pages
const Sidebar = () => {
  const { user, logout } = useAuth();
  
  return (
    <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <NavLink to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:rotate-6 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <span className="font-black text-xl text-slate-900 tracking-tight">VocalCampus</span>
        </NavLink>
        <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-black mt-4 ml-1">Command Hub</p>
      </div>

      <nav className="flex-grow px-4 space-y-2 py-4">
        <NavLink to="/admin" className={({ isActive }) => `flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all ${isActive ? 'bg-blue-600 text-white font-bold shadow-xl shadow-blue-500/30' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 012 2h2a2 2 0 012-2" />
          </svg>
          <span className="text-xs uppercase tracking-widest">Analytics Center</span>
        </NavLink>
        <NavLink to="/department" className={({ isActive }) => `flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all ${isActive ? 'bg-blue-600 text-white font-bold shadow-xl shadow-blue-500/30' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="text-xs uppercase tracking-widest">Task Backlog</span>
        </NavLink>
      </nav>

      <div className="p-6">
        <div className="bg-slate-900 p-5 rounded-[2rem] flex items-center justify-between shadow-2xl shadow-slate-900/20 group">
          <div className="overflow-hidden">
            <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">Session Active</p>
            <p className="text-[11px] font-bold text-white truncate max-w-[100px]">{user?.name}</p>
            <button onClick={logout} className="text-[9px] text-red-400 mt-2 uppercase font-black hover:text-red-300 transition-colors tracking-tighter">Terminate Session</button>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center font-black text-sm uppercase ring-1 ring-white/20">
            {user?.name?.charAt(0)}
          </div>
        </div>
      </div>
    </aside>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin') || location.pathname.startsWith('/department');
  
  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col ${isDashboard ? 'md:flex-row' : ''} font-sans`}>
      {isDashboard ? <Sidebar /> : <Navbar />}
      
      <main className={`flex-grow overflow-y-auto w-full ${isDashboard ? 'h-screen' : ''}`}>
        <div className={`max-w-7xl mx-auto px-6 ${isDashboard ? 'py-12' : 'py-16'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<SubmitComplaint />} />
            <Route path="/track" element={<TrackComplaint />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/department" element={
              <ProtectedRoute>
                <DepartmentDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </main>
      <ToastContainer position="bottom-right" theme="colored" hideProgressBar autoClose={3000} />
    </div>
  );
};

function App() {
  return (
    <StrictMode>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </StrictMode>
  );
}

import { StrictMode } from 'react'
export default App;
