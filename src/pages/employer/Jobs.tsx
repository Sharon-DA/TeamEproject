import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Plus, Clock, FileBadge, ArrowUpRight, ShieldCheck, MapPin, DollarSign } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import { useToast } from '../../context/ToastContext';

type Tab = 'active' | 'post' | 'pending';

const myJobs = [
    { id: 1, title: 'SOFTWARE ENGINEER INTERN', applicants: 145, posted: '2W AGO', location: 'ABUJA' },
    { id: 2, title: 'DATA ANALYST', applicants: 89, posted: '1M AGO', location: 'REMOTE' },
    { id: 3, title: 'PRODUCT MANAGER INTERN', applicants: 42, posted: '3D AGO', location: 'LAGOS' },
];

const EmployerJobs = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [tab, setTab] = useState<Tab>('active');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            showToast('Job listing submitted for Staff review.', 'success');
            setTab('pending');
        }, 1500);
    };

    return (
        <div className="p-10 space-y-12 anime-fade-in font-sans pb-20">
            {/* 1. Header Section */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 border-b-[3px] border-black pb-10">
                <div className="text-left space-y-2">
                    <h2 className="text-6xl font-black text-black leading-none uppercase tracking-tighter">Job Console .</h2>
                    <p className="text-lg font-bold text-nile-blue/50 uppercase tracking-widest flex items-center">
                        Manage your recruitment pipeline <ShieldCheck size={20} className="ml-3 text-nile-green" />
                    </p>
                </div>
                
                <div className="flex bg-white p-2 border-[3px] border-black rounded-[24px] shadow-sm">
                    {([
                        { id: 'active', label: 'ACTIVE LISTINGS', icon: <Briefcase size={14} /> },
                        { id: 'post', label: 'POST NEW ROLE', icon: <Plus size={14} /> },
                        { id: 'pending', label: 'PENDING REVIEWS', icon: <Clock size={14} /> },
                    ] as const).map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all flex items-center space-x-3
                                ${tab === t.id ? 'bg-nile-blue text-white shadow-[4px_4px_0px_0px_rgba(108,187,86,1)]' : 'text-black/40 hover:text-black'}
                            `}
                        >
                            {t.icon}
                            <span>{t.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. Content Logic */}
            {tab === 'active' && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 text-left">
                    {myJobs.map(job => (
                        <Card key={job.id} variant="flat" className="border-[3px] border-black p-8 hover:translate-y-[-4px] transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(108,187,86,0.15)] flex flex-col justify-between min-h-[220px]">
                            <div className="flex justify-between items-start">
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                         <h3 className="text-2xl font-black text-black uppercase tracking-tight leading-none">{job.title}</h3>
                                         <p className="text-[10px] font-black text-nile-blue/40 uppercase tracking-widest flex items-center">
                                             <MapPin size={12} className="mr-2" /> {job.location} • POSTED {job.posted}
                                         </p>
                                    </div>
                                    <div className="bg-nile-blue text-white px-4 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(108,187,86,1)] font-black text-[10px] uppercase tracking-widest inline-block">
                                        {job.applicants} APPLICANTS WAITLISTED
                                    </div>
                                </div>
                                <button className="p-3 bg-nile-white border-2 border-black rounded-xl hover:bg-black hover:text-white transition-all text-nile-blue">
                                    <ArrowUpRight size={20} strokeWidth={3} />
                                </button>
                            </div>
                            <div className="pt-6 border-t-2 border-dashed border-black/5 mt-6 flex justify-between items-center">
                                 <button onClick={() => navigate('/employer/applications')} className="text-[10px] font-black text-nile-blue underline underline-offset-4 hover:text-nile-green transition-colors uppercase tracking-widest">REVIEW ALL CANDIDATES</button>
                                 <button className="text-[10px] font-black text-red-500 uppercase tracking-widest">ARCHIVE ROLE</button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {tab === 'post' && (
                <div className="max-w-4xl mx-auto anime-slide-up">
                    <Card variant="default" className="p-10 md:p-16">
                         <div className="flex items-center space-x-6 mb-12 pb-8 border-b-[3px] border-black/5 text-left">
                            <div className="w-16 h-16 bg-nile-green text-white rounded-2xl flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(30,73,157,1)]">
                                <Plus size={32} strokeWidth={3} />
                            </div>
                            <div>
                                <h2 className="text-4xl font-black text-black uppercase tracking-tighter">Draft Profile</h2>
                                <p className="text-[10px] font-black text-nile-blue uppercase tracking-[0.3em]">NEW PROFESSIONAL LISTING</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <InputField label="OFFICIAL JOB TITLE" placeholder="E.G. TECHNICAL PRODUCT MANAGER" required />
                                <InputField label="LISTING TYPE" placeholder="E.G. FULL-TIME INTERNSHIP" required />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <InputField label="PRIMARY LOCATION" placeholder="ABUJA HQ / REMOTE-FIRST" icon={<MapPin size={18} />} required />
                                <InputField label="COMPENSATION RANGE" placeholder="₦400,000 - ₦600,000" icon={<DollarSign size={18} />} />
                            </div>

                            <div className="space-y-4 text-left">
                                <label className="text-[10px] font-black text-black tracking-[0.2em] uppercase ml-1">JOB SPECIFICATION</label>
                                <textarea 
                                    className="w-full h-48 border-[3px] border-black rounded-2xl p-6 font-bold text-sm outline-none focus:shadow-[6px_6px_0px_0px_#6CBB56] transition-all bg-nile-white/40"
                                    placeholder="Outline the core professional requirements and day-to-day responsibilities..."
                                    required
                                ></textarea>
                            </div>

                            <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
                                DISPATCH FOR STAFF APPROVAL
                            </Button>
                        </form>
                    </Card>
                </div>
            )}

            {tab === 'pending' && (
                <div className="max-w-2xl mx-auto space-y-6">
                     <Card className="p-16 text-center space-y-8 bg-nile-blue/5 border-dashed border-4 border-black/20">
                          <div className="w-24 h-24 bg-white border-[3px] border-black rounded-[32px] flex items-center justify-center mx-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                              <FileBadge size={48} className="text-nile-blue" />
                          </div>
                          <div className="space-y-3">
                              <h3 className="text-3xl font-black text-black uppercase tracking-tighter">Under Review</h3>
                              <p className="text-sm font-bold text-nile-blue/60 uppercase tracking-widest leading-relaxed">Your professional listing is currently being <br/> vetted by the Nile Career Services team.</p>
                          </div>
                          <div className="pt-8 flex flex-col items-center space-y-4 font-black">
                               <div className="flex items-center space-x-2 text-nile-green text-[10px] uppercase tracking-widest">
                                   <div className="pulse-green"></div>
                                   <span>STATUS: VERIFYING CREDENTIALS</span>
                               </div>
                               <Button variant="outline" size="sm" onClick={() => setTab('active')}>BACK TO ACTIVE</Button>
                          </div>
                     </Card>
                </div>
            )}

        </div>
    );
};

export default EmployerJobs;
