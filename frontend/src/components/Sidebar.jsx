import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

          <NavLink to="/dashboard/tasks" onClick={onClose} className={({ isActive }) => `flex items-center space-x-3 px-3 py-2.5 rounded transition-all text-sm font-semibold ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
            <span>Task Management</span>
          </NavLink>
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

export default Sidebar;
