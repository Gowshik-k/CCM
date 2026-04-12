import React, { useState } from 'react';
import { complaintService } from '../services/api';
import { toast } from 'react-toastify';

const TrackComplaint = () => {
    const [trackingId, setTrackingId] = useState('');
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!trackingId) {
            toast.warning('Please enter a tracking ID');
            return;
        }

        setLoading(true);
        try {
            const res = await complaintService.trackComplaint(trackingId);
            setComplaint(res.data.data);
            toast.success('Complaint found!');
        } catch (err) {
            toast.error('Could not find a complaint with that ID');
            setComplaint(null);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Resolved': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            case 'In Progress': return 'text-blue-600 bg-blue-50 border-blue-100';
            default: return 'text-slate-500 bg-slate-50 border-slate-100';
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <header className="mb-10">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Track your <span className="text-blue-600">Complaint</span></h1>
                <p className="text-slate-500">Check the real-time status and resolution details of your anonymous report.</p>
            </header>

            <div className="glass-card mb-10 overflow-hidden">
                <form onSubmit={handleTrack} className="p-6 flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-grow">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Tracking identification ID</label>
                        <input 
                            type="text"
                            placeholder="e.g. CCM-XXXX-XXXX"
                            className="input-field font-mono uppercase"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn-primary flex items-center space-x-2 h-[50px] shadow-blue-500/20"
                    >
                        {loading ? 'Searching...' : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span>Track Status</span>
                            </>
                        )}
                    </button>
                </form>
            </div>

            {complaint && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-1">{complaint.title}</h3>
                                <p className="text-xs font-mono text-slate-400 uppercase tracking-tighter">REF: {complaint.complaintId}</p>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(complaint.status)}`}>
                                {complaint.status}
                            </span>
                        </div>

                        <div className="p-8">
                            {/* Timeline-style Progress */}
                            <div className="mb-10">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Workflow Status</p>
                                <div className="flex items-center w-full">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-900 mt-2 uppercase">LODGED</p>
                                    </div>
                                    <div className={`flex-grow h-1 mx-2 rounded-full ${complaint.status !== 'Pending' ? 'bg-blue-600' : 'bg-slate-100'}`}></div>
                                    <div className="flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${complaint.status !== 'Pending' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100 text-slate-400'}`}>
                                            {complaint.status === 'Resolved' ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <div className={complaint.status === 'In Progress' ? 'animate-pulse' : ''}>2</div>
                                            )}
                                        </div>
                                        <p className={`text-[10px] font-bold mt-2 uppercase ${complaint.status !== 'Pending' ? 'text-slate-900' : 'text-slate-400'}`}>IN PROGRESS</p>
                                    </div>
                                    <div className={`flex-grow h-1 mx-2 rounded-full ${complaint.status === 'Resolved' ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
                                    <div className="flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${complaint.status === 'Resolved' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-100 text-slate-400'}`}>
                                            3
                                        </div>
                                        <p className={`text-[10px] font-bold mt-2 uppercase ${complaint.status === 'Resolved' ? 'text-slate-900' : 'text-slate-400'}`}>RESOLVED</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Assigned Department</p>
                                        <p className="text-slate-900 font-semibold flex items-center">
                                            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                                            {complaint.department}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Priority Level</p>
                                        <p className={`font-semibold ${complaint.priority === 'High' ? 'text-red-500' : 'text-slate-700'}`}>
                                            {complaint.priority} Priority
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Submitted On</p>
                                        <p className="text-slate-900 font-medium">
                                            {new Date(complaint.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Resolution Note</p>
                                    {complaint.resolutionNote ? (
                                        <p className="text-slate-700 leading-relaxed italic italic">"{complaint.resolutionNote}"</p>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-6 text-slate-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            <p className="text-xs text-center font-medium">Official response will appear here once the department reviews your complaint.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackComplaint;
