import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Home = () => {
    return (
        <div className="space-y-24 animate-in fade-in duration-1000 max-w-6xl mx-auto">
            {/* Hero Section */}
            <section className="relative pt-4 pb-12 overflow-hidden">
                <div className="relative z-10 text-center lg:text-left grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-700"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">v2.0 AI-Core Live</span>
                        </div>
                        
                        <h1 className="text-5xl font-black text-slate-950 leading-[1.05] tracking-tighter">
                            Your Voice, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 italic">Heard Anonymously.</span>
                        </h1>
                        
                        <p className="text-lg text-slate-800 max-w-md mx-auto lg:mx-0 leading-relaxed font-semibold">
                            The next generation of campus feedback. Securely lodge complaints, track progress, and let AI handle the routing—all without revealing your identity.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                            <Link to="/submit" className="btn-primary py-4 px-10 shadow-2xl shadow-blue-500/20 text-base">
                                Lodge a Complaint
                            </Link>
                            <Link to="/track" className="btn-secondary py-4 px-10 text-base border-slate-300 text-slate-900">
                                Track Existing
                            </Link>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start space-x-5 pt-4">
                            <div className="flex -space-x-2.5">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                                        <div className={`w-full h-full bg-blue-${i * 100 + 100} opacity-90`}></div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Trusted by <span className="text-slate-950">2,500+</span> students</p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-10 bg-blue-100/30 rounded-full blur-[100px] opacity-60"></div>
                        <Card className="relative p-0 overflow-hidden border border-slate-200 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] rounded-[2.5rem]">
                            <div className="bg-slate-900 p-8 text-white">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex space-x-1.5">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    </div>
                                    <p className="text-[9px] font-black opacity-60 uppercase tracking-[0.2em]">Neural Router v4.0</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-3 w-3/4 bg-slate-800 rounded-full animate-pulse"></div>
                                    <div className="h-3 w-1/2 bg-slate-800 rounded-full animate-pulse opacity-80"></div>
                                    <div className="pt-6">
                                        <div className="p-5 bg-blue-600/20 border border-blue-500/30 rounded-2xl">
                                            <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-2">AI Routing Logic:</p>
                                            <p className="text-sm font-bold text-blue-50 italic">"Sentiment verified. Priority: HIGH. Routed to Maintenance Dept."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <p className="text-[11px] font-black text-slate-950 uppercase tracking-tight">100% Identity Shielded</p>
                                    </div>
                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Encrypted</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="grid md:grid-cols-3 gap-10">
                <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                    <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-black text-slate-950 mb-3 tracking-tight">AI Engine</h3>
                    <p className="text-slate-800 text-sm leading-relaxed font-bold">
                        Automatic sentiment analysis and keyword extraction routes your issues to the right department in milliseconds.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622l-0.382-3.040z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-black text-slate-950 mb-3 tracking-tight">Identity Shield</h3>
                    <p className="text-slate-800 text-sm leading-relaxed font-bold">
                        No logins, no tracking cookies, no identity leaks. Your voice matters, your identity doesn't have to.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-700 rounded-xl flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 012 2h2a2 2 0 012-2" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-black text-slate-950 mb-3 tracking-tight">Real-time Tracker</h3>
                    <p className="text-slate-800 text-sm leading-relaxed font-bold">
                        Watch your complaint move through the resolution pipeline with a unique, encrypted tracking ID.
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-slate-950 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-slate-900/30">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-30 -mr-20 -mt-20"></div>
                <div className="relative z-10 space-y-6">
                    <h2 className="text-3xl font-black tracking-tight">Ready to improve your campus?</h2>
                    <p className="text-slate-300 max-w-md mx-auto text-sm font-bold">Join thousands of students who are making their university a better place through constructive, anonymous feedback.</p>
                    <div className="pt-4">
                        <Link to="/submit" className="bg-white text-slate-950 px-10 py-4 rounded-full font-black text-base hover:bg-slate-100 transition-all inline-block shadow-xl">
                            Start Secure Submission
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
