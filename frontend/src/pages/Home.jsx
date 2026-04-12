import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Home = () => {
    return (
        <div className="space-y-20 animate-in fade-in duration-1000">
            {/* Hero Section */}
            <section className="relative py-10 overflow-hidden">
                <div className="relative z-10 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full border border-blue-100">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                            </span>
                            <span className="text-xs font-bold uppercase tracking-widest">v2.0 AI-Core Live</span>
                        </div>
                        
                        <h1 className="text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                            Your Voice, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Heard Anonymously.</span>
                        </h1>
                        
                        <p className="text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            The next generation of campus feedback. Securely lodge complaints, track progress, and let AI handle the routing—all without revealing your identity.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link to="/submit" className="btn-primary py-4 px-10 shadow-2xl shadow-blue-500/40 text-lg">
                                Lodge a Complaint
                            </Link>
                            <Link to="/track" className="btn-secondary py-4 px-10 text-lg">
                                Track Existing
                            </Link>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start space-x-6 pt-4">
                            <div className="flex -space-x-3">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                                        <div className={`w-full h-full bg-blue-${i * 100 + 100}`}></div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm font-medium text-slate-400">Trusted by <span className="text-slate-900 font-bold">2,500+</span> students</p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full blur-3xl opacity-50"></div>
                        <Card className="relative p-0 overflow-hidden border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                            <div className="bg-slate-900 p-8 text-white">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    </div>
                                    <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Neural Router v4.0</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-4 w-3/4 bg-slate-800 rounded animate-pulse"></div>
                                    <div className="h-4 w-1/2 bg-slate-800 rounded animate-pulse opacity-60"></div>
                                    <div className="pt-6">
                                        <div className="p-4 bg-blue-600/20 border border-blue-500/30 rounded-xl">
                                            <p className="text-xs font-bold text-blue-400 uppercase mb-2">AI Processing Output:</p>
                                            <p className="text-sm font-mono text-blue-100 italic">"Sentiment verified. Priority: HIGH. Routed to Infrastructure Maintenance Dept."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <p className="text-xs font-bold text-slate-900">100% Identity Shielded</p>
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Encrypted</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="grid md:grid-cols-3 gap-8">
                <Card className="hover:-translate-y-2 transition-transform h-full">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">AI Engine</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Automatic sentiment analysis and keyword extraction routes your issues to the right department in milliseconds.
                    </p>
                </Card>

                <Card className="hover:-translate-y-2 transition-transform h-full">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622l-0.382-3.040z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Military Grade Anonymity</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        No logins, no tracking cookies, no identity leaks. Your voice matters, your identity doesn't have to.
                    </p>
                </Card>

                <Card className="hover:-translate-y-2 transition-transform h-full">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 012 2h2a2 2 0 012-2" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Tracking</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Watch your complaint move through the campus resolution pipeline with a unique, encrypted tracking ID.
                    </p>
                </Card>
            </section>

            {/* CTA Section */}
            <section className="bg-slate-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
                <div className="relative z-10 space-y-6">
                    <h2 className="text-4xl font-bold">Ready to improve your campus?</h2>
                    <p className="text-slate-400 max-w-lg mx-auto">Join thousands of students who are making their university a better place through constructive, anonymous feedback.</p>
                    <div className="pt-4">
                        <Link to="/submit" className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all inline-block">
                            Start Secure Submission
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
