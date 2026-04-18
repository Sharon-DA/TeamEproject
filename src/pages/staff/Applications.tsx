import React, { useState, useEffect } from 'react';
import { BarChart2, Building2, ShieldCheck, UserCheck, UserX, Clock, ArrowUpRight, Filter, Search, Activity, Layers } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import { useToast } from '../../context/ToastContext';

interface PendingRecruiter {
    id: number;
    name: string;
    company: string;
    submitted: string;
    status: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

const mockRecruiters: PendingRecruiter[] = [
    { id: 1, name: 'Sarah Jenkins', company: 'Google Tech', submitted: '2h ago', status: 'PENDING' },
    { id: 2, name: 'David Kabir', company: 'Shell NG', submitted: '5h ago', status: 'PENDING' },
];

const StaffApplications = () => {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState<'ANALYTICS' | 'VERIFICATIONS'>('ANALYTICS');
    const [recruiters, setRecruiters] = useState<PendingRecruiter[]>(mockRecruiters);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleVerify = (id: number, name: string, action: 'VERIFIED' | 'REJECTED') => {
        setRecruiters(prev => prev.filter(r => r.id !== id));
        showToast(`Recruiter ${name} has been ${action.toLowerCase()}.`, action === 'VERIFIED' ? 'success' : 'error');
    };

    const analytics = [
        { role: "SOFTWARE ENGR", apps: "1,245", trend: "+12%", color: "text-nile-green" },
        { role: "DATA ANALYST", apps: "856", trend: "+5%", color: "text-nile-blue" },
        { role: "PRODUCT MGMT", apps: "412", trend: "-2%", color: "text-red-500" },
        { role: "UX DESIGN", apps: "289", trend: "+18%", color: "text-nile-green" }
    ];

    if (isLoading) {
        return (
            <div className="p-8 space-y-8 animate-pulse text-left h-full">
                <div className="h-48 bg-black/5 rounded-[40px] border-2 border-black/5"></div>
                <div className="grid grid-cols-4 gap-6">
                    {[1,2,3,4].map(i => <div key={i} className="h-32 bg-black/5 rounded-2xl"></div>)}
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-12 anime-fade-in font-sans pb-20 text-left h-full">
            {/* 1. Header & Strategy Section */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 border-b-[2px] border-black pb-10">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black text-black leading-none uppercase tracking-tighter">Access & Logistics .</h2>
                    <p className="text-[10px] font-black text-nile-blue/50 uppercase tracking-[0.2em]">SYSTEM-WIDE RECRUITMENT FLOWS & AUTH</p>
                </div>
                
                <div className="flex bg-white p-1 border-[2px] border-black rounded-2xl shadow-sm">
                    {(['ANALYTICS', 'VERIFICATIONS'] as const).map(t => (
                        <button
                            key={t}
                            onClick={() => setActiveTab(t)}
                            className={`px-8 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all
                                ${activeTab === t ? 'bg-black text-white shadow-[2px_2px_0px_0px_#1E499D]' : 'text-black/40 hover:text-black'}
                            `}
                        >
                            {t} {t === 'VERIFICATIONS' && recruiters.length > 0 && (
                                <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-[8px]">{recruiters.length}</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. Content Sections */}
            {activeTab === 'ANALYTICS' ? (
                <div className="space-y-12">
                     {/* System Metrics Hero */}
                     <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {analytics.map((s) => (
                            <Card key={s.role} className="p-8 group hover:translate-y-[-2px] transition-all">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-2.5 bg-nile-white rounded-lg border-[1px] border-black group-hover:bg-black group-hover:text-white transition-colors">
                                        <Activity size={18} />
                                    </div>
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-full border border-black/10 ${s.trend.startsWith('+') ? 'bg-nile-green/10 text-nile-green' : 'bg-red-50 text-red-500'}`}>
                                        {s.trend}
                                    </span>
                                </div>
                                <h3 className="text-3xl font-black text-black leading-none tracking-tighter">{s.apps}</h3>
                                <p className="text-[9px] font-black text-black/30 uppercase mt-2 tracking-widest">{s.role}</p>
                            </Card>
                        ))}
                     </section>

                     {/* Top Partner Organizations */}
                     <section className="space-y-6">
                         <div className="flex items-center justify-between px-2">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center text-black/40">
                                <Layers size={14} className="mr-2" /> TOP PARTNER ENGAGEMENT
                            </h3>
                         </div>
                         <div className="space-y-4">
                            {[
                                { name: 'Google Tech', apps: 850, active: 12, health: 98 },
                                { name: 'Shell Nigeria', apps: 420, active: 5, health: 85 },
                                { name: 'Access Bank', apps: 380, active: 8, health: 92 },
                            ].map(company => (
                                <div key={company.name} className="bg-white border-[2px] border-black rounded-[24px] p-6 flex items-center justify-between transition-all hover:bg-nile-white/40">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center border-2 border-black font-black">
                                            {company.name[0]}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-black leading-none mb-1 uppercase tracking-tight">{company.name}</h4>
                                            <p className="text-[9px] font-black text-nile-blue/40 uppercase tracking-widest">Global Partner Hub • Verified</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-12 items-center">
                                         <div className="text-center">
                                            <p className="text-[8px] font-black text-black/30 uppercase mb-1">Applications</p>
                                            <p className="text-xl font-black text-black leading-none">{company.apps}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[8px] font-black text-black/30 uppercase mb-1">Active Jobs</p>
                                            <p className="text-xl font-black text-black leading-none">{company.active}</p>
                                        </div>
                                        <button className="p-3 bg-nile-green/10 text-nile-green border-2 border-black rounded-xl hover:bg-black hover:text-white transition-all">
                                            <ArrowUpRight size={18} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                         </div>
                     </section>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-2">
                     <div className="bg-nile-blue/5 border-2 border-dashed border-black/10 rounded-[32px] p-12 text-center space-y-6">
                         <div className="w-16 h-16 bg-white border-[2px] border-black rounded-2xl flex items-center justify-center mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                             <ShieldCheck size={32} className="text-nile-blue" />
                         </div>
                         <div className="space-y-2">
                             <h3 className="text-2xl font-black text-black uppercase tracking-tight">Recruiter Vetting</h3>
                             <p className="text-[10px] font-bold text-nile-blue/40 uppercase tracking-widest leading-relaxed">System awaiting authorization for internal hiring panels.</p>
                         </div>
                     </div>

                     <div className="space-y-4">
                        {recruiters.map(r => (
                             <div key={r.id} className="bg-white border-[2px] border-black rounded-[24px] p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                                <div className="flex items-center space-x-4">
                                    <Avatar name={r.name} size="sm" />
                                    <div className="text-left">
                                        <h4 className="text-sm font-black text-black leading-none mb-1 uppercase">{r.name}</h4>
                                        <p className="text-[9px] font-black text-nile-green uppercase tracking-widest">{r.company} • Submitted {r.submitted}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-3">
                                    <Button size="xs" onClick={() => handleVerify(r.id, r.name, 'VERIFIED')}>
                                        <UserCheck size={14} className="mr-2" /> VERIFY
                                    </Button>
                                    <Button size="xs" variant="outline" onClick={() => handleVerify(r.id, r.name, 'REJECTED')}>
                                        <UserX size={14} className="mr-2" /> DENY
                                    </Button>
                                </div>
                             </div>
                        ))}
                        {recruiters.length === 0 && (
                            <div className="py-20 text-center opacity-30 font-black uppercase text-[10px] tracking-widest">
                                ALL RECRUITERS VERIFIED. SYSTEM CLEAR.
                            </div>
                        )}
                     </div>
                </div>
            )}
        </div>
    );
};

export default StaffApplications;
