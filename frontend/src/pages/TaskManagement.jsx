import React, { useState, useEffect } from 'react';
import { adminService, departmentService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Badge from '../components/Badge';

const TaskManagement = () => {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedId, setExpandedId] = useState(null);

    const isAdmin = user?.role === 'admin';

    const fetchComplaints = async () => {
        setLoading(true);
        try {
            let res;
            if (isAdmin) {
                res = await adminService.getComplaints({});
            } else {
                res = await departmentService.getDepartmentComplaints(user.department);
            }
            setComplaints(res.data.data);
        } catch (err) {
            toast.error('Failed to load tasks.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, [user]);

    const handleStatusUpdate = async (id, newStatus, resolutionNote = '') => {
        try {
            if (isAdmin) {
                await adminService.updateStatus(id, newStatus);
            } else {
                await departmentService.updateDepartmentComplaint(id, { 
                    status: newStatus, 
                    resolutionNote 
                });
            }
            toast.success('Record updated.');
            fetchComplaints();
        } catch (err) {
            toast.error('Update failed.');
        }
    };

    const filtered = complaints.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.complaintId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Task Management</h1>
                    <p className="text-slate-500 mt-2 font-medium">Review detailed descriptions and manage resolution workflows.</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-3">
                    <div className="px-4 py-2 bg-slate-100 rounded-xl border border-slate-200">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Queue Size</p>
                        <p className="text-sm font-black text-slate-900">{complaints.length} Tasks</p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                    </span>
                    <input 
                        type="text" 
                        placeholder="Search IDs or keywords..."
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:border-slate-900 transition-all text-sm font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <button 
                    onClick={fetchComplaints}
                    className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                >
                    <svg className={`w-4 h-4 text-slate-600 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                </button>
            </div>

            {/* Expandable Data Table */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">Grievance</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">Metadata</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">Priority</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">Status</th>
                                <th className="px-6 py-4 text-right border-b border-slate-200"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan="5" className="px-6 py-20 text-center text-slate-400 font-medium italic">Synchronizing database...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan="5" className="px-6 py-20 text-center text-slate-400 font-medium italic">No records found.</td></tr>
                            ) : filtered.map(c => (
                                <React.Fragment key={c._id}>
                                    <tr 
                                        className={`group cursor-pointer transition-colors ${expandedId === c._id ? 'bg-slate-50/80' : 'hover:bg-slate-50/30'}`}
                                        onClick={() => toggleExpand(c._id)}
                                    >
                                        <td className="px-6 py-6">
                                            <div className="font-black text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{c.title}</div>
                                            <div className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-tighter">REF: {c.complaintId}</div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="text-xs font-bold text-slate-700">{isAdmin ? c.department : c.category}</div>
                                            <div className="text-[10px] text-slate-400 font-medium mt-1">{new Date(c.createdAt).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <Badge type={c.priority}>{c.priority}</Badge>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center space-x-2.5">
                                                <div className={`w-2 h-2 rounded-full ${c.status === 'Resolved' ? 'bg-emerald-500' : c.status === 'In Progress' ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
                                                <span className="text-xs font-black text-slate-900 uppercase">{c.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <div className={`transition-transform duration-300 ${expandedId === c._id ? 'rotate-180' : ''}`}>
                                                <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    {/* Expanded Content Area */}
                                    {expandedId === c._id && (
                                        <tr className="bg-slate-50/50">
                                            <td colSpan="5" className="px-8 py-8">
                                                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                                        {/* Description */}
                                                        <div className="lg:col-span-2 space-y-4">
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Description</p>
                                                            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-slate-800 text-sm font-medium leading-relaxed shadow-sm">
                                                                {c.description}
                                                            </div>
                                                            {c.resolutionNote && (
                                                                <div className="space-y-4">
                                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resolution Note</p>
                                                                    <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 text-emerald-800 text-sm font-medium leading-relaxed italic">
                                                                        "{c.resolutionNote}"
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Actions Panel */}
                                                        <div className="space-y-6">
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Manage Resolution</p>
                                                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                                                                <div className="space-y-2">
                                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Update Workflow Status</label>
                                                                    <select 
                                                                        value={c.status}
                                                                        onChange={(e) => handleStatusUpdate(c.complaintId, e.target.value)}
                                                                        disabled={!isAdmin}
                                                                        className="w-full text-xs font-black border-2 border-slate-100 bg-slate-50 rounded-xl px-4 py-3 outline-none focus:border-slate-900 transition-colors cursor-pointer"
                                                                    >
                                                                        <option value="Pending">Pending Review</option>
                                                                        <option value="In Progress">In Progress</option>
                                                                        <option value="Resolved">Mark as Resolved</option>
                                                                    </select>
                                                                </div>

                                                                {!isAdmin && c.status !== 'Resolved' && (
                                                                    <button 
                                                                        onClick={() => {
                                                                            const resNote = prompt('Enter a formal resolution note for the student:');
                                                                            if (resNote) handleStatusUpdate(c.complaintId, 'Resolved', resNote);
                                                                        }}
                                                                        className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-black uppercase hover:bg-black transition-all shadow-lg shadow-slate-900/10"
                                                                    >
                                                                        Complete Task
                                                                    </button>
                                                                )}

                                                                {isAdmin && (
                                                                    <div className="pt-2">
                                                                        <button className="w-full border-2 border-slate-100 text-slate-400 py-3 rounded-xl text-xs font-black uppercase hover:bg-slate-50 transition-all">
                                                                            Transfer Dept.
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TaskManagement;
