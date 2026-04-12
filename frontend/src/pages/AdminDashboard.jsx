import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import { toast } from 'react-toastify';
import Badge from '../components/Badge';
import Card from '../components/Card';

const AdminDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ priority: '', department: '', status: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const fetchComplaints = async () => {
        setLoading(true);
        try {
            const res = await adminService.getComplaints(filters);
            setComplaints(res.data.data);
        } catch (err) {
            toast.error('Failed to load complaints.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, [filters]);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await adminService.updateStatus(id, newStatus);
            toast.success('Status updated');
            fetchComplaints();
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    const filteredComplaints = complaints.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.complaintId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = [
        { label: 'Total Requests', value: complaints.length, color: 'text-blue-600' },
        { label: 'Action Required', value: complaints.filter(c => c.priority === 'High').length, color: 'text-red-600' },
        { label: 'In Queue', value: complaints.filter(c => c.status === 'Pending').length, color: 'text-amber-600' },
        { label: 'Solved', value: complaints.filter(c => c.status === 'Resolved').length, color: 'text-emerald-600' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Admin Command Center</h1>
                    <p className="text-slate-500">Manage, categorize, and monitor campus-wide feedback.</p>
                </div>
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Live System</span>
                </div>
            </header>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="px-6 py-6">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                        <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
                    </Card>
                ))}
            </div>

            <div className="bg-white/50 backdrop-blur-md p-4 rounded-3xl border border-slate-100 flex flex-col lg:grid lg:grid-cols-12 gap-4 items-center shadow-lg shadow-slate-200/20">
                <div className="relative col-span-7 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input 
                        type="text" 
                        placeholder="Search IDs or keywords..."
                        className="input-field pl-12 h-12 border-none bg-white shadow-inner"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4 w-full">
                    <select name="priority" onChange={(e) => setFilters({...filters, priority: e.target.value})} className="input-field h-12 py-0 border-none bg-white shadow-inner">
                        <option value="">Priority</option>
                        <option value="High">🔴 High</option>
                        <option value="Medium">🟡 Medium</option>
                        <option value="Low">🟢 Low</option>
                    </select>
                    <select name="status" onChange={(e) => setFilters({...filters, status: e.target.value})} className="input-field h-12 py-0 border-none bg-white shadow-inner">
                        <option value="">Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
            </div>

            <Card className="p-0 border-none shadow-2xl">
                <div className="overflow-x-auto rounded-3xl overflow-hidden border border-slate-100">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entry Details</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Priority</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredComplaints.length > 0 ? filteredComplaints.map((c) => (
                                <tr key={c._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{c.title}</div>
                                        <div className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-tighter">{c.complaintId}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-medium text-slate-600">{c.department}</div>
                                        <div className="text-[10px] text-slate-400 mt-0.5">{c.category}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <Badge type={c.priority}>{c.priority}</Badge>
                                    </td>
                                    <td className="px-8 py-6">
                                        <select 
                                            value={c.status}
                                            onChange={(e) => handleStatusUpdate(c.complaintId, e.target.value)}
                                            className="text-xs font-bold border-none bg-slate-100 rounded-lg px-3 py-1.5 focus:ring-0 cursor-pointer"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Resolved">Resolved</option>
                                        </select>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-300 hover:text-blue-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-slate-400 italic font-medium">No results found matching your search.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminDashboard;
