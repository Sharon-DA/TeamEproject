import React from 'react';
import { Settings, Download, Mail, Phone, MapPin, Shield } from 'lucide-react';
import Avatar from '../../components/Avatar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const StaffProfile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const name = user?.name || 'STAFF MEMBER';
    const email = user?.email || 'staff@nileuni.edu.ng';
    const department = user?.department || 'CAREER SERVICES';

    return (
        <div className="p-8 space-y-10 anime-fade-in font-sans pb-20 text-left max-w-4xl mx-auto">

            {/* Profile Header Banner */}
            <div className="bg-white border-[2px] border-black rounded-[32px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                {/* Cover */}
                <div className="h-36 bg-black border-b-[2px] border-black relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white border-[2px] border-black rounded-lg flex items-center justify-center shadow-sm hover:bg-nile-green transition-colors">
                        <Settings size={16} strokeWidth={2.5} />
                    </button>
                </div>

                <div className="px-8 pb-8 relative">
                    {/* Avatar */}
                    <div className="absolute -top-10 left-8 w-20 h-20 rounded-[16px] border-[2px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <Avatar name={name} size="lg" />
                    </div>

                    <div className="pt-14 flex justify-between items-end flex-wrap gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center space-x-2 mb-1">
                                <h1 className="text-3xl font-black text-black uppercase leading-none tracking-tighter">{name} .</h1>
                                <span className="bg-black text-white px-2 py-0.5 rounded text-[7px] font-black border border-black">STAFF</span>
                            </div>
                            <p className="text-[9px] font-black text-nile-blue/50 uppercase tracking-[0.2em]">{department}</p>
                            <div className="flex items-center space-x-2 text-[8px] font-black text-black/30 uppercase pt-1">
                                <Mail size={11} strokeWidth={3} />
                                <span>{email}</span>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">
                            <Settings size={14} className="mr-2" /> EDIT PROFILE
                        </Button>
                    </div>

                    {/* Staff Stats */}
                    <div className="flex space-x-10 mt-6 pt-5 border-t-[2px] border-black/5">
                        <Stat value="42" label="PENDING CVs" />
                        <Stat value="156" label="COMPANIES" />
                        <Stat value="78%" label="PLACEMENT" highlight />
                        <Stat value="4,218" label="USERS" />
                    </div>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contact Card */}
                <div className="bg-white border-[2px] border-black rounded-[24px] p-6 shadow-sm space-y-4">
                    <h3 className="text-[10px] font-black text-black uppercase tracking-widest pb-3 border-b-[2px] border-black/5">CONTACT INFO</h3>
                    <InfoRow icon={<Mail size={14} />} label="EMAIL" value={email} />
                    <InfoRow icon={<Phone size={14} />} label="OFFICE PHONE" value="+234 (0) 9 123 4567" />
                    <InfoRow icon={<MapPin size={14} />} label="OFFICE" value="Student Centre, Rm 402" />
                    <InfoRow icon={<Shield size={14} />} label="ACCESS LEVEL" value="ADMIN • VERIFIED" />
                </div>

                {/* Reports Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <h2 className="text-sm font-black text-black uppercase tracking-widest mb-1">GENERATE REPORTS</h2>
                        <p className="text-[9px] font-black text-nile-blue/40 uppercase tracking-[0.15em]">ADMIN ANALYTICS FOR PLATFORM ACTIVITY</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ReportCard
                            title="WEEKLY REVIEW"
                            desc="PAST 7 DAYS: SIGNUPS, JOB POSTINGS & EVENTS."
                            dark={false}
                        />
                        <ReportCard
                            title="MONTHLY REVIEW"
                            desc="PLACEMENT RATES, APPLICATION TRENDS & EMPLOYER FEEDBACK."
                            dark
                        />
                    </div>
                </div>
            </div>

            {/* Recent Reports */}
            <div className="space-y-4">
                <h2 className="text-sm font-black text-black uppercase tracking-widest">RECENT REPORTS</h2>
                {[
                    { title: 'SEPTEMBER 2026 MONTHLY REVIEW', date: 'OCT 1, 2026' },
                    { title: 'WEEK 39 ENGAGEMENT SUMMARY', date: 'SEP 28, 2026' },
                    { title: 'WEEK 38 ENGAGEMENT SUMMARY', date: 'SEP 21, 2026' },
                ].map((r, i) => (
                    <div key={i} className="flex justify-between items-center p-5 bg-white border-[2px] border-dashed border-black rounded-[20px] hover:bg-nile-white/60 hover:border-solid transition-all cursor-pointer group">
                        <div>
                            <h4 className="text-xs font-black text-black uppercase tracking-widest">{r.title}</h4>
                            <p className="text-[8px] font-black text-nile-blue/40 uppercase tracking-widest mt-1">GENERATED: {r.date}</p>
                        </div>
                        <button className="w-9 h-9 bg-white border-[2px] border-black rounded-xl flex items-center justify-center group-hover:bg-nile-green transition-colors shadow-sm">
                            <Download size={16} strokeWidth={2.5} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Stat = ({ value, label, highlight = false }: { value: string; label: string; highlight?: boolean }) => (
    <div className="text-left">
        <p className={`text-xl font-black leading-none ${highlight ? 'text-nile-green' : 'text-black'}`}>{value}</p>
        <p className="text-[7px] font-black text-nile-blue/40 uppercase tracking-[0.15em] mt-1">{label}</p>
    </div>
);

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-nile-white border-[2px] border-black rounded-lg flex items-center justify-center flex-shrink-0 text-nile-blue">
            {icon}
        </div>
        <div>
            <p className="text-[7px] font-black text-black/30 uppercase tracking-[0.2em]">{label}</p>
            <p className="text-[9px] font-black text-black uppercase tracking-wider">{value}</p>
        </div>
    </div>
);

const ReportCard = ({ title, desc, dark }: { title: string; desc: string; dark: boolean }) => (
    <div className={`border-[2px] border-black rounded-[20px] p-6 flex flex-col shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all ${dark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <h3 className="text-xs font-black uppercase tracking-widest mb-2">{title}</h3>
        <p className={`text-[8px] font-black uppercase tracking-widest leading-relaxed flex-1 ${dark ? 'text-white/40' : 'text-nile-blue/40'}`}>{desc}</p>
        <button className={`mt-6 w-full py-3 font-black text-[9px] uppercase tracking-widest rounded-xl border-[2px] flex items-center justify-center space-x-2 transition-all ${dark ? 'bg-white text-black border-white hover:bg-nile-green' : 'bg-black text-white border-black hover:bg-nile-blue'}`}>
            <Download size={12} strokeWidth={3} />
            <span>GENERATE {title.split(' ')[0]}</span>
        </button>
    </div>
);

export default StaffProfile;
