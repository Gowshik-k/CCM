import React, { useState } from 'react';
import { complaintService } from '../services/api';
import { toast } from 'react-toastify';

const SubmitComplaint = () => {
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [submittedId, setSubmittedId] = useState(null);
    const [aiResult, setAiResult] = useState(null);

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
            <div className="max-w-xl mx-auto mt-10 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Thank You!</h1>
                <p className="text-slate-500 mb-8">Your complaint has been safely recorded anonymously.</p>
                
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-left mb-8">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Your Tracking ID</p>
                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300">
                        <code className="text-xl font-mono font-bold text-blue-600">{submittedId}</code>
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(submittedId);
                                toast.info('ID Copied!');
                            }}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm px-3 py-1 bg-blue-50 rounded-lg transition-colors"
                        >
                            Copy ID
                        </button>
                    </div>
                    
                    {aiResult && (
                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">AI Analysis Result</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <p className="text-[10px] text-slate-500 uppercase">Priority</p>
                                    <p className={`font-bold ${aiResult.priority === 'High' ? 'text-red-600' : 'text-slate-700'}`}>{aiResult.priority}</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <p className="text-[10px] text-slate-500 uppercase">Department</p>
                                    <p className="font-bold text-slate-700">{aiResult.department}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <button 
                    onClick={() => { setSubmittedId(null); setAiResult(null); }}
                    className="btn-primary w-full"
                >
                    Submit Another Complaint
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-10 duration-700">
            <header className="mb-10 lg:text-center text-left">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                    Lodge a <span className="text-blue-600">Complaint</span>
                </h1>
                <p className="text-lg text-slate-500">
                    Your voice matters. Submit your concerns anonymously and our AI will route it to the right department instantly.
                </p>
            </header>

            <div className="glass-card overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Subject / Title</label>
                        <input 
                            type="text"
                            placeholder="Brief summary of the issue..."
                            className="input-field"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Detailed Description</label>
                        <textarea 
                            rows="6"
                            placeholder="Please provide details. Don't worry, your identity is never stored."
                            className="input-field resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                        <p className="mt-3 text-xs text-slate-400 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            AI will use this to automatically categorize and prioritize your request.
                        </p>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center space-x-2 py-4 shadow-xl shadow-blue-500/30"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Analyzing & Routing...</span>
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                <span>Submit Securely</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4 p-4 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 italic font-serif text-blue-600 font-bold">Encrypted</div>
                    <p className="text-[10px] text-slate-500 uppercase leading-tight font-bold">End-to-End<br/>Secure</p>
                </div>
                <div className="flex items-center space-x-4 p-4 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 italic font-serif text-blue-600 font-bold">AI Scan</div>
                    <p className="text-[10px] text-slate-500 uppercase leading-tight font-bold">Auto<br/>Categorized</p>
                </div>
                <div className="flex items-center space-x-4 p-4 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 italic font-serif text-blue-600 font-bold">100% Anon</div>
                    <p className="text-[10px] text-slate-500 uppercase leading-tight font-bold">Developer<br/>Privacy</p>
                </div>
            </div>
        </div>
    );
};

export default SubmitComplaint;
