import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import { toast } from 'react-toastify';
import Card from '../components/Card';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await authService.login(credentials.email, credentials.password);
            login(res.data);
            toast.success('Login Successful!');
            if (res.data.role === 'admin') navigate('/admin');
            else navigate('/department');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Login failed. Check credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 animate-in fade-in slide-in-from-top-4 duration-500">
            <Card gradient>
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Staff Access</h2>
                    <p className="text-sm text-slate-500">Sign in to manage campus complaints.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                        <input 
                            type="email" 
                            className="input-field" 
                            placeholder="staff@vocalcampus.com"
                            value={credentials.email}
                            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
                        <input 
                            type="password" 
                            className="input-field" 
                            placeholder="••••••••"
                            value={credentials.password}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn-primary w-full py-4"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-50 text-center">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider italic">Protected by VocalCampus Security Layer</p>
                </div>
            </Card>
        </div>
    );
};

export default Login;
