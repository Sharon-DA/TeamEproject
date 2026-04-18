import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Plus, UserRound, ArrowRight, TrendingUp, Users, Target, CheckCircle2 } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import Feed from '../../components/Feed';
import Modal from '../../components/Modal';
import InputField from '../../components/InputField';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

const activeJobs = [
    { id: 1, title: 'SOFTWARE ENGINEER INTERN', applicants: 145, status: 'Active' },
    { id: 2, title: 'DATA ANALYST', applicants: 89, status: 'Interviewing' },
    { id: 3, title: 'PRODUCT MANAGER', applicants: 42, status: 'Closed' },
];

const recommendedCandidates = [
    { id: 1, name: 'GRACE STANLEY', major: 'COMPUTER SCIENCE', match: 98, level: '400L' },
    { id: 2, name: 'MICHAEL BROWN', major: 'BUSINESS ADMIN', match: 92, level: 'ALUMNI' },
    { id: 3, name: 'AISHAT YUSUF', major: 'CYBERSECURITY', match: 88, level: '300L' },
];

const EmployerDashboardPage = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { user } = useAuth();
    const companyName = user?.company || 'YOUR COMPANY';
    const recruiterName = user?.name || 'RECRUITER';
    const [isPostModalOpen, setPostModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('NEW UPDATE');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleOpenModal = (title: string) => {
        setModalTitle(title);
        setPostModalOpen(true);
    };

    const handlePostSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        showToast('Successfully posted to the Nile community!', 'success');
        setPostModalOpen(false);
    };

    if (isLoading) {
        return (
            <div className="p-8 space-y-10 animate-pulse bg-nile-white h-full">
                <div className="h-48 bg-black/5 rounded-[40px] border-3 border-black/5"></div>
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-8 space-y-8">
                        <div className="h-20 bg-black/5 rounded-3xl"></div>
                        <div className="h-[600px] bg-black/5 rounded-[40px]"></div>
                    </div>
                    <div className="col-span-4 space-y-8">
                        <div className="h-64 bg-black/5 rounded-[40px]"></div>
                        <div className="h-64 bg-black/5 rounded-[40px]"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-12 anime-fade-in font-sans bg-nile-white min-h-full">
            
            {/* 1. Recruiter Hub Hero: Professional Overview */}
            <section className="bg-white border-[3px] border-black rounded-[40px] shadow-[8px_8px_0px_0px_rgba(108,187,86,1)] p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-nile-green/5 -skew-x-12 translate-x-1/2"></div>
                
                <div className="space-y-6 max-w-2xl z-10 text-left">
                    <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-nile-green text-white text-[10px] font-black uppercase tracking-widest rounded-full">RECRUITER COMMAND</span>
                        <span className="flex items-center space-x-1 text-[10px] font-black text-nile-blue uppercase tracking-widest">
                            <div className="pulse-blue"></div>
                            <span>{companyName} HUB</span>
                        </span>
                    </div>
                    <h2 className="text-6xl font-black text-black leading-[0.9] uppercase tracking-tighter">
                        Find your next <br />
                        <span className="text-nile-green">Star Talent</span>
                    </h2>
                    <p className="text-lg font-bold text-nile-blue/70 leading-snug uppercase max-w-md">
                        Your hiring pipeline is <span className="text-nile-green underline">OPTIMIZED</span>. You have 48 new high-match applicants waiting for review.
                    </p>
                    <div className="flex space-x-4 pt-2">
                         <Button onClick={() => handleOpenModal('POST NEW JOB')} size="lg" variant="primary">
                             <Plus size={18} className="mr-2" strokeWidth={3} /> Post Active Job
                         </Button>
                         <Button variant="outline" size="lg" onClick={() => navigate('/employer/candidates')}>Browse Talent</Button>
                    </div>
                </div>

                <div className="hidden md:flex w-[340px] h-[240px] bg-white border-[3px] border-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_rgba(30,73,157,1)] z-10 flex-col justify-between">
                     <div className="flex justify-between items-start">
                         <div className="w-12 h-12 bg-nile-blue/10 rounded-xl flex items-center justify-center text-nile-blue">
                             <Users size={24} />
                         </div>
                         <span className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest">RECRUITMENT STATS</span>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <h4 className="text-3xl font-black text-black leading-none">12</h4>
                            <p className="text-[8px] font-black text-nile-blue opacity-60 uppercase tracking-widest">OPEN ROLES</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-3xl font-black text-nile-green leading-none">450+</h4>
                            <p className="text-[8px] font-black text-nile-blue opacity-60 uppercase tracking-widest">TOTAL APPS</p>
                        </div>
                     </div>
                     <div className="flex items-center space-x-2 text-[9px] font-black text-nile-green uppercase tracking-widest">
                         <TrendingUp size={12} />
                         <span>+14% SUCCESS RATE MONTHLY</span>
                     </div>
                </div>
            </section>

            {/* 2. Main Content Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                
                {/* Left: Engagement Column */}
                <div className="xl:col-span-8 space-y-10">
                     <div className="bg-white border-[3px] border-black rounded-3xl p-6 shadow-brutalist-sm flex items-center space-x-6">
                        <Avatar name="Sarah Jenkins" size="lg" />
                        <div className="flex-1 space-y-3 text-left">
                            <h3 className="text-xs font-black uppercase text-black-40">What's the recruitment strategy today?</h3>
                            <div className="flex flex-wrap gap-3">
                                <button onClick={() => handleOpenModal('SHARE UPDATE')} className="text-[9px] font-black uppercase px-6 py-3 bg-nile-white border-2 border-black rounded-xl hover:bg-black hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(30,73,157,1)] hover:shadow-none translate-y-[-2px] active:translate-y-0">SHARE ANNOUNCE</button>
                                <button onClick={() => handleOpenModal('CAREER TIPS')} className="text-[9px] font-black uppercase px-6 py-3 bg-nile-white border-2 border-black rounded-xl hover:bg-black hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(108,187,86,1)] hover:shadow-none translate-y-[-2px] active:translate-y-0">POST INTERVIEW TIPS</button>
                                <button onClick={() => handleOpenModal('HIRING NEWS')} className="text-[9px] font-black uppercase px-6 py-3 bg-nile-white border-2 border-black rounded-xl hover:bg-black hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none translate-y-[-2px] active:translate-y-0">HIRING SPOTLIGHT</button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center">
                                <Target size={18} className="mr-2 text-nile-blue" /> GLOBAL REACH FEED
                            </h3>
                        </div>
                        <Feed />
                    </div>
                </div>

                {/* Right: Insight Column */}
                <div className="xl:col-span-4 space-y-10">
                    <Card title="ACTIVE LISTINGS">
                        <div className="space-y-4">
                            {activeJobs.map((job) => (
                                <div key={job.id} className="p-5 bg-nile-white/50 border-2 border-black rounded-2xl group hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(108,187,86,1)] transition-all cursor-pointer">
                                    <div className="flex justify-between items-start text-left">
                                        <div className="space-y-2">
                                            <p className="font-black text-[12px] uppercase leading-none text-black group-hover:text-nile-green transition-colors">{job.title}</p>
                                            <div className="flex items-center space-x-2">
                                                <span className={`text-[8px] font-black px-2 py-0.5 rounded border border-black/10 ${job.status === 'Closed' ? 'bg-red-100 text-red-500' : 'bg-nile-green/10 text-nile-green'}`}>{job.status.toUpperCase()}</span>
                                                <span className="text-[9px] font-black text-nile-blue/40 uppercase tracking-widest">{job.applicants} APPLICANTS</span>
                                            </div>
                                        </div>
                                        <div className="p-1 px-3 border-2 border-black rounded-lg text-[10px] font-black group-hover:bg-black group-hover:text-white transition-all">
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button fullWidth variant="ghost" size="sm" className="mt-8" onClick={() => navigate('/employer/jobs')}>MANAGE ALL JOBS</Button>
                    </Card>

                    <Card title="AI MATCH TALENT">
                         <div className="space-y-6">
                            {recommendedCandidates.map((c) => (
                                <div key={c.id} className="flex items-center justify-between p-4 bg-white border-2 border-black/5 rounded-2xl hover:border-black transition-all group cursor-pointer">
                                    <div className="flex items-center space-x-3">
                                        <Avatar name={c.name} size="sm" />
                                        <div className="text-left">
                                            <p className="font-black text-[11px] uppercase truncate text-black">{c.name}</p>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[8px] font-black text-nile-green uppercase">{c.match}% MATCH</span>
                                                <span className="text-[8px] font-black text-black/30 uppercase">{c.level}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => navigate('/employer/candidates')} className="p-2 border-2 border-black/5 group-hover:border-black rounded-lg transition-all group-hover:bg-nile-green group-hover:text-white">
                                        <CheckCircle2 size={12} strokeWidth={3} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <Button fullWidth variant="outline" className="mt-8" onClick={() => navigate('/employer/candidates')}>VIEW TALENT POOL</Button>
                    </Card>
                </div>
            </div>

            {/* Application Modal interface */}
            <Modal isOpen={isPostModalOpen} onClose={() => setPostModalOpen(false)} title={modalTitle}>
                <form onSubmit={handlePostSubmit} className="space-y-8">
                    {modalTitle === 'POST NEW JOB' ? (
                        <>
                            <div className="grid grid-cols-2 gap-6">
                                <InputField label="JOB TITLE" placeholder="E.G. SOFTWARE ENGINEER" required />
                                <InputField label="LOCATION" placeholder="ABUJA / REMOTE" required />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <InputField label="SALARY RANGE" placeholder="₦200,000 - ₦450,000" />
                                <InputField label="JOB CATEGORY" placeholder="TECHNOLOGY / BUSINESS" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-black tracking-[0.2em] uppercase ml-1">JOB DESCRIPTION & REQUIREMENTS</label>
                                <textarea 
                                    className="w-full h-40 border-[3px] border-black rounded-2xl p-6 font-bold text-sm outline-none focus:shadow-[6px_6px_0px_0px_#6CBB56] transition-all bg-nile-white/40"
                                    placeholder="Outline the core responsibilities and qualifications required for this role..."
                                    required
                                ></textarea>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-black tracking-[0.2em] uppercase ml-1">MESSAGE CONTENT</label>
                            <textarea 
                                className="w-full h-48 border-[3px] border-black rounded-2xl p-6 font-bold text-sm outline-none focus:shadow-[6px_6px_0px_0px_#1E499D] transition-all bg-nile-white/40"
                                placeholder={`What professional ${modalTitle.toLowerCase()} would you like to share today?`}
                                required
                            ></textarea>
                        </div>
                    )}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={() => setPostModalOpen(false)} type="button">DISCARD</Button>
                        <Button variant="primary" type="submit">PUBLISH WORLDWIDE</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default EmployerDashboardPage;
