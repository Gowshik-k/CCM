import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

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

export default Navbar;
