import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, ShieldCheck, TrendingUp, Users, CheckCircle2, XCircle, Activity, BellRing, Settings, FileSearch } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Feed from '../../components/Feed';
import Avatar from '../../components/Avatar';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

const stats = [
    { label: 'PLATFORM USERS', value: '4,218', change: '+12%', type: 'neutral' },
    { label: 'VERIFIED COMPANIES', value: '156', change: '+5', type: 'positive' },
    { label: 'PENDING CVs', value: '42', change: '-8', type: 'negative' },
    { label: 'PLACEMENT RATE', value: '78%', change: '+3%', type: 'positive' },
];

const pendingApprovals = [
    { id: 1, name: 'MICHAEL OLADELE', major: 'MECH. ENG', doc: 'Internship CV', time: '20m ago' },
    { id: 2, name: 'SARAH JENKINS', major: 'COMP. SCI', doc: 'Full-time Resume', time: '1h ago' },
    { id: 3, name: 'DAVID KABIR', major: 'BUSINESS', doc: 'Cover Letter', time: '3h ago' },
];

const StaffDashboard = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { user } = useAuth();
    const staffName = user?.name || 'ADMIN';
    const department = user?.department || 'CAREER SERVICES';
    const [approvals, setApprovals] = useState(pendingApprovals);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleAction = (id: number, name: string, action: 'approved' | 'rejected') => {
        setApprovals(prev => prev.filter(a => a.id !== id));
        showToast(`Document for ${name} has been ${action}.`, action === 'approved' ? 'success' : 'error');
    };

    if (isLoading) {
        return (
            <div className="p-8 space-y-10 animate-pulse bg-nile-white h-full">
                <div className="h-48 bg-black/5 rounded-[40px] border-3 border-black/5"></div>
                <div className="grid grid-cols-4 gap-6">
                    {[1,2,3,4].map(i => <div key={i} className="h-32 bg-black/5 rounded-3xl"></div>)}
                </div>
                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-8 h-[600px] bg-black/5 rounded-[40px]"></div>
                    <div className="col-span-4 h-[600px] bg-black/5 rounded-[40px]"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-12 anime-fade-in font-sans bg-nile-white min-h-full">
            
            {/* 1. Admin Console Hero: Authoritative Overview */}
            <section className="bg-white border-[3px] border-black rounded-[40px] shadow-[8px_8px_0px_0px_#000000] p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-1/3 h-full bg-black/5 -skew-x-12 translate-x-1/2"></div>
                
                <div className="space-y-6 max-w-2xl z-10 text-left">
                    <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full">SYSTEM COMMAND</span>
                        <span className="flex items-center space-x-1 text-[10px] font-black text-nile-blue uppercase tracking-widest">
                            <div className="pulse-blue"></div>
                            <span>{staffName} • {department}</span>
                        </span>
                    </div>
                    <h2 className="text-6xl font-black text-black leading-[0.9] uppercase tracking-tighter">
                        Platform <br />
                        <span className="text-nile-blue">Intelligence</span>
                    </h2>
                    <p className="text-lg font-bold text-nile-blue/70 leading-snug uppercase max-w-md">
                        Global platform health is <span className="text-black underline">OPTIMAL</span>. All verification channels are active with <span className="text-nile-green">zero downtime</span>.
                    </p>
                    <div className="flex space-x-4 pt-2">
                         <Button onClick={() => navigate('/staff/services')} size="lg">Platform Services</Button>
                         <Button variant="outline" size="lg" onClick={() => navigate('/staff/profile')}>Security Controls</Button>
                    </div>
                </div>

                <div className="hidden md:flex w-[340px] h-[240px] bg-white border-[3px] border-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_rgba(108,187,86,1)] z-10 flex-col justify-between">
                     <div className="flex justify-between items-start">
                         <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center text-black">
                             <Activity size={24} />
                         </div>
                         <span className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest">SYSTEM PULSE</span>
                     </div>
                     <div className="space-y-1">
                         <h4 className="text-4xl font-black text-black leading-none">99.9%</h4>
                         <p className="text-[10px] font-black text-nile-blue opacity-60 uppercase tracking-widest">UPTIME STATUS</p>
                     </div>
                     <div className="flex items-center space-x-2 text-[10px] font-black text-nile-green uppercase tracking-widest">
                         <CheckCircle2 size={12} strokeWidth={3} />
                         <span>ALL SYSTEMS OPERATIONAL</span>
                     </div>
                </div>
            </section>

            {/* 2. Fast Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {stats.map((s) => (
                    <Card key={s.label} className="p-8 hover:translate-y-[-4px] group transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl border-2 border-black group-hover:bg-black group-hover:text-white transition-colors`}>
                                <TrendingUp size={20} />
                            </div>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-full border-2 border-black ${s.type === 'positive' ? 'bg-nile-green/10 text-nile-green' : s.type === 'negative' ? 'bg-red-50 text-red-500' : 'bg-black/5 text-black'}`}>
                                {s.change}
                            </span>
                        </div>
                        <h3 className="text-4xl font-black text-black leading-none uppercase tracking-tighter">{s.value}</h3>
                        <p className="text-[10px] font-black text-black/40 uppercase mt-3 tracking-widest">{s.label}</p>
                    </Card>
                ))}
            </div>

            {/* 3. Operational Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                
                {/* Left: Queue Column */}
                <div className="xl:col-span-8 space-y-10">
                     <Card title="OPERATIONAL QUEUE">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b-[3px] border-black/5 text-left">
                            <div className="flex items-center space-x-4">
                                <div className="bg-nile-blue text-white p-2 rounded-lg">
                                    <FileSearch size={18} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase text-black">Document Verifications</h4>
                                    <p className="text-[9px] font-black text-nile-blue/40 uppercase tracking-widest">AWAITING STAFF ACTION</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-black bg-black text-white px-3 py-1 rounded-full">{approvals.length} PENDING</span>
                        </div>
                        
                        <div className="space-y-4">
                            {approvals.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-6 bg-nile-white/40 border-[3px] border-black rounded-[24px] hover:bg-white transition-all group">
                                    <div className="flex items-center space-x-5">
                                        <Avatar name={item.name} size="md" />
                                        <div className="text-left">
                                            <p className="font-black text-sm uppercase text-black leading-none mb-1">{item.name}</p>
                                            <div className="flex items-center space-x-3">
                                                 <span className="text-[9px] font-black text-nile-blue uppercase">{item.major}</span>
                                                 <span className="text-[9px] font-black text-black/30 uppercase">•</span>
                                                 <span className="text-[9px] font-black text-nile-green uppercase tracking-widest">{item.doc}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button 
                                            onClick={() => handleAction(item.id, item.name, 'approved')}
                                            className="p-3 bg-nile-green text-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-[-2px] active:translate-y-0 transition-all"
                                        >
                                            <CheckCircle2 size={18} strokeWidth={3} />
                                        </button>
                                        <button 
                                            onClick={() => handleAction(item.id, item.name, 'rejected')}
                                            className="p-3 bg-white text-red-500 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-[-2px] active:translate-y-0 transition-all"
                                        >
                                            <XCircle size={18} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {approvals.length === 0 && (
                                <div className="py-20 text-center space-y-4 border-2 border-dashed border-black/10 rounded-[32px]">
                                     <div className="w-16 h-16 bg-nile-green/10 text-nile-green rounded-full flex items-center justify-center mx-auto mb-4">
                                         <CheckCircle2 size={32} />
                                     </div>
                                     <p className="text-xs font-black text-black/30 uppercase tracking-[0.2em]">All documents cleared . Good job !</p>
                                </div>
                            )}
                        </div>
                     </Card>
                     
                     <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center">
                                <Activity size={18} className="mr-2 text-nile-green" /> BROADCAST FEED
                            </h3>
                        </div>
                        <Feed />
                     </div>
                </div>

                {/* Right: Insights Column */}
                <div className="xl:col-span-4 space-y-10">
                    <Card title="PLATFORM ANALYTICS">
                         <div className="space-y-8">
                            <h4 className="text-[10px] font-black text-nile-blue/40 uppercase tracking-widest border-b-2 border-black/5 pb-2">TRAFFIC SOURCE</h4>
                            <div className="space-y-6">
                                {[
                                    { label: 'STUDENT PORTAL', val: 78, color: 'bg-nile-blue' },
                                    { label: 'STAFF CONSOLE', val: 12, color: 'bg-black' },
                                    { label: 'EMPLOYER HUB', val: 45, color: 'bg-nile-green' },
                                ].map((bar) => (
                                    <div key={bar.label} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.15em] text-left">
                                            <span>{bar.label}</span>
                                            <span className="text-nile-blue">{bar.val}%</span>
                                        </div>
                                        <div className="h-4 bg-nile-white border-[3px] border-black rounded-full overflow-hidden p-0.5">
                                            <div className={`h-full ${bar.color} rounded-full transition-all duration-1000`} style={{ width: `${bar.val}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card title="ADMINISTRATIVE TOOLS">
                        <div className="space-y-4">
                            <AdminTool icon={<Users size={18} />} label="User Verification" onAction={() => navigate('/staff/services')} />
                            <AdminTool icon={<BellRing size={18} />} label="Global Broadcast" onAction={() => showToast('Broadcast system open.', 'success')} />
                            <AdminTool icon={<Settings size={18} />} label="Security Protocol" onAction={() => navigate('/staff/profile')} />
                        </div>
                        <Button fullWidth variant="outline" className="mt-8" onClick={() => navigate('/login')}>
                            LOGOUT CONSOLE
                        </Button>
                    </Card>
                </div>
            </div>

        </div>
    );
};

const AdminTool = ({ icon, label, onAction }: { icon: React.ReactNode, label: string, onAction: () => void }) => (
    <button 
        onClick={onAction}
        className="w-full flex items-center space-x-4 p-5 bg-white border-[3px] border-black rounded-2xl hover:translate-x-1 hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(30,73,157,1)] hover:shadow-none text-left"
    >
        <div className="flex-shrink-0 group-hover:scale-110 transition-transform">{icon}</div>
        <span className="text-xs font-black uppercase tracking-widest">{label}</span>
    </button>
);

export default StaffDashboard;
