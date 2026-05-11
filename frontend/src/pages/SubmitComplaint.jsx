import React, { useState, useEffect } from 'react';
import { complaintService } from '../services/api';
import { toast } from 'react-toastify';

const SubmitComplaint = () => {
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [submittedId, setSubmittedId] = useState(null);
    const [aiResult, setAiResult] = useState(null);

    // Prevent body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const res = await complaintService.submitComplaint(formData);
            setAiResult(res.data.data);
            setSubmittedId(res.data.data.complaintId);
            toast.success('Complaint submitted successfully!');
            setFormData({ title: '', description: '' });
        } catch (err) {
            toast.error('Failed to submit complaint. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submittedId) {
        return (
            <div className="fixed inset-0 z-[60] bg-white flex items-center justify-center p-6 animate-in fade-in duration-700">
                <div className="max-w-md w-full">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-black text-slate-950 mb-3 tracking-tighter italic uppercase">Confirmed.</h1>
                        <p className="text-slate-600 font-bold uppercase text-[9px] tracking-[0.3em] mb-8">Submission ID: {submittedId}</p>
                        
                        <div className="w-full grid grid-cols-2 gap-3 mb-8">
                            <div className="p-6 bg-slate-50 rounded-[1.5rem] border border-slate-200">
                                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Routed To</p>
                                <p className="text-sm font-bold text-slate-950 truncate">{aiResult?.department || 'General'}</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Security Level</p>
                                <p className="text-sm font-bold text-slate-950">Encrypted</p>
                            </div>
                        </div>

                        <button 
                            onClick={() => { setSubmittedId(null); setAiResult(null); }}
                            className="bg-slate-900 text-white px-10 py-3.5 rounded-full font-black text-sm hover:bg-black transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/10"
                        >
                            Log Another Issue
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 top-16 bg-white flex flex-col lg:flex-row overflow-hidden animate-in fade-in duration-1000">
            {/* Branding Section (Width: 35% | Increased Content Size) */}
            <div className="w-full lg:w-[35%] h-1/4 lg:h-full bg-slate-50 flex flex-col justify-center px-10 md:px-20 py-12 relative border-r border-slate-200">
                <div className="relative z-10 max-w-sm">
                    <div className="inline-flex items-center space-x-3 mb-10">
                        <div className="h-0.5 w-8 bg-slate-950"></div>
                        <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.4em]">VocalCampus AI</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-10">
                        Your Voice, <br />
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-slate-950 to-slate-500">Shielded.</span>
                    </h1>
                    
                    <p className="text-slate-800 text-lg font-semibold leading-relaxed mb-12">
                        Enterprise-grade anonymity for campus grievances. Our neural engine handles the routing securely.
                    </p>

                    <div className="flex flex-wrap gap-2.5">
                        <div className="px-6 py-3 bg-white rounded-full border border-slate-300 text-[10px] font-black text-slate-700 uppercase tracking-widest shadow-sm">
                            SHA-256 ENCRYPTED
                        </div>
                    </div>
                </div>

                <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-100 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 opacity-30"></div>
            </div>

            {/* Form Section (Width: flex-grow) */}
            <div className="flex-grow h-full bg-white flex flex-col justify-center px-10 md:px-32 py-12 relative overflow-hidden">
                <div className="max-w-2xl w-full mx-auto lg:mx-0">
                    <header className="mb-12">
                        <h2 className="text-2xl font-black text-slate-950 tracking-tight mb-2 flex items-center">
                            Lodge Grievance
                            <span className="ml-3 w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                        </h2>
                        <p className="text-slate-600 font-bold uppercase text-[8px] tracking-[0.3em]">Institutional Secure Portal v4.0</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="group space-y-2.5">
                            <label className="text-[8px] font-black text-slate-500 group-focus-within:text-slate-950 uppercase tracking-widest transition-colors block">
                                Subject / Context
                            </label>
                            <input 
                                type="text"
                                placeholder="What is the issue about?"
                                className="w-full text-xl font-bold bg-transparent border-b-2 border-slate-200 focus:border-slate-950 transition-all outline-none pb-3 placeholder:text-slate-300 text-slate-950"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="group space-y-2.5">
                            <label className="text-[8px] font-black text-slate-500 group-focus-within:text-slate-950 uppercase tracking-widest transition-colors block">
                                Detailed Description
                            </label>
                            <textarea 
                                rows="6"
                                placeholder="Describe the concern clearly. Avoid personal identifiers to maintain 100% anonymity."
                                className="w-full bg-slate-50 rounded-2xl p-8 focus:bg-white border-2 border-slate-200 focus:border-slate-900 transition-all outline-none text-slate-900 font-semibold placeholder:text-slate-400 resize-none leading-relaxed text-base"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="group bg-slate-900 text-white w-full py-5 rounded-full text-lg font-black hover:bg-black transition-all flex items-center justify-center space-x-3 shadow-xl shadow-slate-900/10 active:scale-[0.98]"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        <span>Analyzing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Submit Grievance Securely</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute bottom-8 right-8 flex space-x-1">
                    {[1,2,3].map(i => <div key={i} className="w-0.5 h-0.5 rounded-full bg-slate-200"></div>)}
                </div>
            </div>
        </div>
    );
};

export default SubmitComplaint;
