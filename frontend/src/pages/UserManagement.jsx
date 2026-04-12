import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import { toast } from 'react-toastify';

const DEPARTMENTS = [
    'Academic Affairs', 
    'Maintenance & Facilities', 
    'Hostel Administration', 
    'General Administration', 
    'Disciplinary Committee'
];

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'department',
        department: 'General Administration'
    });

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await adminService.getUsers();
            setUsers(res.data.data);
        } catch (err) {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminService.createUser(formData);
            toast.success('Access provisioned.');
            setFormData({ name: '', email: '', password: '', role: 'department', department: 'General Administration' });
            fetchUsers();
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to create user');
        }
    };

    const handleUpdate = async (id, field, value) => {
        try {
            await adminService.updateUser(id, { [field]: value });
            toast.success('Privileges updated.');
            fetchUsers();
        } catch (err) {
            toast.error('Update failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Terminate this user access?')) return;
        try {
            await adminService.deleteUser(id);
            toast.success('Access revoked.');
            fetchUsers();
        } catch (err) {
            toast.error('Failed to remove user');
        }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Directory Control</h1>
                    <p className="text-slate-500 mt-2">Manage personnel access levels and departmental assignments.</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Pool:</span>
                    <span className="bg-slate-900 text-white px-3 py-1 rounded text-xs font-bold">{users.length} Users</span>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
                {/* Classic Registry Table */}
                <div className="lg:col-span-8">
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Personnel</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Assignment</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loading ? (
                                        <tr><td colSpan="3" className="px-6 py-12 text-center text-slate-400 italic">Accessing directory data...</td></tr>
                                    ) : users.map(user => (
                                        <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                                                        <p className="text-[10px] text-slate-400">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="space-y-2">
                                                    <select 
                                                        value={user.role}
                                                        onChange={(e) => handleUpdate(user._id, 'role', e.target.value)}
                                                        className="block text-[10px] font-bold border border-slate-200 bg-white rounded-md px-2 py-1 outline-none uppercase"
                                                    >
                                                        <option value="admin">Admin</option>
                                                        <option value="department">Manager</option>
                                                    </select>
                                                    <select 
                                                        value={user.department}
                                                        onChange={(e) => handleUpdate(user._id, 'department', e.target.value)}
                                                        className="block text-[10px] font-bold text-slate-400 bg-transparent border-none p-0 outline-none cursor-pointer uppercase tracking-tight"
                                                    >
                                                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                {user.email !== 'admin@vocalcampus.com' && (
                                                    <button 
                                                        onClick={() => handleDelete(user._id)}
                                                        className="text-[10px] font-bold text-red-500 hover:text-red-700 uppercase tracking-widest"
                                                    >
                                                        Revoke
                                                    </button>
                                                )}
                                                {user.email === 'admin@vocalcampus.com' && (
                                                    <span className="text-[10px] font-bold text-slate-300 uppercase italic">Primary</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Simplified Account Provisioning */}
                <div className="lg:col-span-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-slate-900">Provision Account</h2>
                            <p className="text-xs text-slate-500 mt-1">Direct account creation for new personnel.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Full Name</label>
                                <input 
                                    className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-500 transition-all font-medium"
                                    type="text" 
                                    placeholder="e.g. John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Email Address</label>
                                <input 
                                    className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-500 transition-all font-medium"
                                    type="email" 
                                    placeholder="e.g. staff@vocalcampus.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Temporary Passcode</label>
                                <input 
                                    className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-500 transition-all font-medium"
                                    type="password" 
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Assigned Unit</label>
                                <select 
                                    className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-500 transition-all font-medium"
                                    value={formData.department}
                                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                                >
                                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <button 
                                type="submit"
                                className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-black transition-colors"
                            >
                                Provision Access
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
