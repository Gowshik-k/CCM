import React, { useState, useEffect } from 'react';
import { adminService, departmentService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Badge from '../components/Badge';
import Card from '../components/Card';

const StaffDashboard = () => {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [note, setNote] = useState('');

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
            setEditingId(null);
            setNote('');
            fetchComplaints();
        } catch (err) {
            toast.error('Update failed.');
        }
    };

    const filtered = complaints.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.complaintId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = [
        { label: 'Total Inbound', value: complaints.length },
        { label: 'Open Tasks', value: complaints.filter(c => c.status !== 'Resolved').length },
        { label: 'High Priority', value: complaints.filter(c => c.priority === 'High').length },
        { label: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length },
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Minimal Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{isAdmin ? 'Administrative Dashboard' : `Unit Dashboard: ${user?.department}`}</h1>
                    <p className="text-slate-500 mt-2">Manage grievance workflow and resolution statuses.</p>
                </div>
                <div className="mt-4 md:mt-0 px-4 py-2 bg-slate-100 rounded-lg">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Authenticated As</p>
                    <p className="text-sm font-bold text-slate-900">{user?.name} ({user?.role})</p>
                </div>
            </div>

            {/* Classic Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
                        <p className="text-xs font-semibold text-slate-500 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                    </span>
                    <input 
                        type="text" 
                        placeholder="Search IDs or keywords..."
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Classic Data Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Grievance</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Metadata</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Priority</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Workflow</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">Synchronizing database...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">No records found.</td></tr>
                            ) : filtered.map(c => (
                                <tr key={c._id} className={`hover:bg-slate-50 transition-colors ${c.status === 'Resolved' ? 'bg-slate-50/50' : ''}`}>
                                    <td className="px-6 py-5">
                                        <div className="font-bold text-slate-900">{c.title}</div>
                                        <div className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-tighter">REF: {c.complaintId}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="text-xs text-slate-600">{isAdmin ? c.department : c.category}</div>
                                        <div className="text-[10px] text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <Badge type={c.priority}>{c.priority}</Badge>
                                    </td>
                                    <td className="px-6 py-5">
                                        {isAdmin ? (
                                            <select 
                                                value={c.status}
                                                onChange={(e) => handleStatusUpdate(c.complaintId, e.target.value)}
                                                className="text-xs font-bold border border-slate-200 bg-white rounded-md px-2 py-1 outline-none"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Resolved">Resolved</option>
                                            </select>
                                        ) : (
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-2 h-2 rounded-full ${c.status === 'Resolved' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                                <span className="text-xs font-medium text-slate-700">{c.status}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        {!isAdmin && c.status !== 'Resolved' && (
                                            <button 
                                                onClick={() => {
                                                    const resNote = prompt('Resolution Note:');
                                                    if (resNote) handleStatusUpdate(c.complaintId, 'Resolved', resNote);
                                                }}
                                                className="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase"
                                            >
                                                Resolve
                                            </button>
                                        )}
                                        {c.status === 'Resolved' && (
                                            <span className="text-[10px] font-bold text-emerald-600 uppercase">Completed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
