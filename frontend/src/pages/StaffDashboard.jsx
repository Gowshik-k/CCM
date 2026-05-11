import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import DashboardAnalytics from '../components/DashboardAnalytics';

const StaffDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const isAdmin = user?.role === 'admin';

    const fetchStats = async () => {
        if (!isAdmin) return;
        setLoading(true);
        try {
            const res = await adminService.getStats();
            setStats(res.data.data);
        } catch (err) {
            console.error('Failed to load stats');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [user]);

    return (
        <div className="space-y-12 max-w-7xl mx-auto pb-20">
            {/* Minimal Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Main Dashboard</h1>
                    <p className="text-slate-500 mt-2 font-medium">Overview of campus-wide grievance metrics and resolution trends.</p>
                </div>
                <div className="mt-4 md:mt-0 px-5 py-3 bg-slate-100 rounded-2xl border border-slate-200">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5">Active Session</p>
                    <p className="text-sm font-black text-slate-900">{user?.name} <span className="text-slate-400 font-bold ml-1">({user?.role.toUpperCase()})</span></p>
                </div>
            </div>

            {/* Quick Stats Bar */}
            {stats && stats.counts && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Cumulative Inbound', value: stats.counts.total },
                        { label: 'Pending Review', value: stats.counts.pending },
                        { label: 'Work In Progress', value: stats.counts.inProgress },
                        { label: 'Successfully Resolved', value: stats.counts.resolved },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-transform hover:-translate-y-1 duration-300">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{stat.label}</p>
                            <p className="text-4xl font-black text-slate-900">{stat.value}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Analytics Section (Admin Only) */}
            {isAdmin ? (
                loading ? (
                    <div className="h-96 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 flex items-center justify-center">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4"></div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Aggregating Data...</p>
                        </div>
                    </div>
                ) : stats ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <DashboardAnalytics stats={stats} />
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
                        <p className="text-slate-400 font-bold italic">No analytic data available yet.</p>
                    </div>
                )
            ) : (
                <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Welcome, {user?.name}</h3>
                    <p className="text-slate-500">Please use the Task Management tab to view and resolve complaints for the {user?.department} department.</p>
                </div>
            )}
        </div>
    );
};

export default StaffDashboard;
