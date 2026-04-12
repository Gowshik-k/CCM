import React, { useState, useEffect } from 'react';
import { departmentService } from '../services/api';
import { toast } from 'react-toastify';

const DEPARTMENTS = [
    'Academic Affairs', 
    'Maintenance & Facilities', 
    'Hostel Administration', 
    'General Administration', 
    'Disciplinary Committee'
];

const DepartmentDashboard = () => {
    const [selectedDept, setSelectedDept] = useState('');
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingComplaint, setEditingComplaint] = useState(null);
    const [note, setNote] = useState('');

    const fetchComplaints = async () => {
        if (!selectedDept) return;
        setLoading(true);
        try {
            const res = await departmentService.getDepartmentComplaints(selectedDept);
            setComplaints(res.data.data);
        } catch (err) {
            toast.error('Failed to load department complaints');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, [selectedDept]);

    const handleUpdate = async (id) => {
        if (!note) {
            toast.warning('Please add a resolution note');
            return;
        }
        try {
            await departmentService.updateDepartmentComplaint(id, { 
                status: 'Resolved', 
                resolutionNote: note 
            });
            toast.success('Complaint resolved successfully');
            setEditingComplaint(null);
            setNote('');
            fetchComplaints();
        } catch (err) {
            toast.error('Update failed');
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">Departmental Portal</h1>
                <p className="text-slate-500">View and resolve grievances assigned to your specific unit.</p>
            </header>

            {/* Department Selector */}
            <div className="flex items-center space-x-4">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Current view:</p>
                <div className="flex flex-wrap gap-2">
                    {DEPARTMENTS.map(dept => (
                        <button 
                            key={dept}
                            onClick={() => setSelectedDept(dept)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${selectedDept === dept ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-400'}`}
                        >
                            {dept}
                        </button>
                    ))}
                </div>
            </div>

            {!selectedDept ? (
                <div className="py-20 text-center glass-card">
                    <div className="w-16 h-16 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <p className="text-slate-400 font-medium">Please select a department above to view pending tasks.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {loading ? (
                        <div className="text-center py-20 text-slate-400">Loading your backlog...</div>
                    ) : complaints.length === 0 ? (
                        <div className="py-20 text-center glass-card italic text-slate-400">All clear! No pending complaints for this department.</div>
                    ) : (
                        complaints.map(c => (
                            <div key={c._id} className={`glass-card p-8 border-l-4 transition-all ${c.status === 'Resolved' ? 'border-l-emerald-500 opacity-60' : c.priority === 'High' ? 'border-l-red-500 shadow-xl shadow-red-500/5' : 'border-l-blue-500'}`}>
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-grow space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <span className={`badge badge-${c.priority.toLowerCase()}`}>{c.priority}</span>
                                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">REF: {c.complaintId}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">{c.title}</h3>
                                        <p className="text-slate-600 bg-slate-50 p-4 rounded-xl text-sm leading-relaxed">
                                            {c.description}
                                        </p>
                                        <div className="flex items-center space-x-4 text-xs font-bold text-slate-400 uppercase">
                                            <span>Type: {c.category}</span>
                                            <span>•</span>
                                            <span>Inbound: {new Date(c.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="md:w-72 flex-shrink-0">
                                        {c.status === 'Resolved' ? (
                                            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                                                <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Status: Resolved</p>
                                                <p className="text-xs text-emerald-800 italic">"{c.resolutionNote}"</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resolution Action</p>
                                                <textarea 
                                                    className="input-field text-sm h-32 resize-none"
                                                    placeholder="Add resolution note..."
                                                    value={editingComplaint === c.complaintId ? note : ''}
                                                    onChange={(e) => {
                                                        setEditingComplaint(c.complaintId);
                                                        setNote(e.target.value);
                                                    }}
                                                ></textarea>
                                                <button 
                                                    onClick={() => handleUpdate(c.complaintId)}
                                                    className="btn-primary w-full shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-700"
                                                >
                                                    Mark as Resolved
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default DepartmentDashboard;
