import React, { useState } from 'react';
import { Settings, Building2, Link, Link2, UserRound, Pencil, X, Plus, Mail, MapPin, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import Card from '../../components/Card';

interface Product { id: number; name: string; desc: string; }
interface Contact { id: number; name: string; role: string; }

const EmployerProfile = () => {
    const { user } = useAuth();

    const companyName = user?.company || 'YOUR COMPANY';
    const recruiterName = user?.name || 'RECRUITER';
    const email = user?.email || 'recruiter@company.com';

    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState({
        about: 'A leading innovator in enterprise solutions. We build scalable, high-performance products used by organizations worldwide. Our mission is to simplify complex workflows through intuitive technology.',
        website: 'company.io',
        linkedin: 'linkedin.com/company/yourcompany',
        industry: 'SOFTWARE & TECHNOLOGY',
        location: 'ABUJA, NIGERIA',
        products: [
            { id: 1, name: 'CLOUDDATA PLATFORM', desc: 'A robust analytics engine processing millions of requests daily.' },
            { id: 2, name: 'WORKFLOW PRO', desc: 'Enterprise project management and automation suite.' },
        ] as Product[],
        contacts: [
            { id: 1, name: recruiterName, role: 'LEAD RECRUITER' },
            { id: 2, name: 'HIRING TEAM', role: 'TALENT ACQUISITION' },
        ] as Contact[],
    });
    const [editForm, setEditForm] = useState(profile);

    const handleSave = () => { setProfile(editForm); setEditing(false); };
    const handleCancel = () => { setEditForm(profile); setEditing(false); };

    return (
        <div className="p-8 space-y-10 anime-fade-in font-sans pb-20 text-left max-w-4xl mx-auto">

            {/* Banner Header */}
            <div className="bg-white border-[2px] border-black rounded-[32px] shadow-[6px_6px_0px_0px_rgba(108,187,86,1)] overflow-hidden">
                <div className="h-36 bg-black border-b-[2px] border-black relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                    <button
                        onClick={() => setEditing(!editing)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white border-[2px] border-black rounded-lg flex items-center justify-center shadow-sm hover:bg-nile-green transition-colors"
                    >
                        {editing ? <X size={16} strokeWidth={2.5} /> : <Settings size={16} strokeWidth={2.5} />}
                    </button>
                </div>

                <div className="px-8 pb-8 relative">
                    {/* Company Logo Avatar */}
                    <div className="absolute -top-10 left-8 w-20 h-20 bg-white border-[2px] border-black rounded-[16px] shadow-[4px_4px_0px_0px_rgba(108,187,86,1)] flex items-center justify-center overflow-hidden">
                        <Building2 size={36} strokeWidth={1.5} className="text-black/40" />
                    </div>

                    <div className="pt-14 flex justify-between items-end flex-wrap gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center space-x-2 mb-1">
                                <h1 className="text-3xl font-black text-black uppercase leading-none tracking-tighter">{companyName} .</h1>
                                <span className="bg-nile-green text-black px-2 py-0.5 rounded text-[7px] font-black border border-black">VERIFIED</span>
                            </div>
                            <p className="text-[9px] font-black text-nile-blue/50 uppercase tracking-[0.2em]">{profile.industry} • {profile.location}</p>
                            <div className="flex items-center space-x-2 text-[8px] font-black text-black/30 uppercase pt-1">
                                <Mail size={11} strokeWidth={3} />
                                <span>{email}</span>
                            </div>
                        </div>
                        {editing ? (
                            <div className="flex space-x-2">
                                <Button variant="outline" size="sm" onClick={handleCancel}><X size={14} className="mr-1" /> CANCEL</Button>
                                <Button size="sm" onClick={handleSave}><Pencil size={14} className="mr-1" /> SAVE</Button>
                            </div>
                        ) : (
                            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                                <Pencil size={14} className="mr-2" /> EDIT PROFILE
                            </Button>
                        )}
                    </div>

                    {/* Stats Row */}
                    <div className="flex space-x-10 mt-6 pt-5 border-t-[2px] border-black/5">
                        <Stat value="3" label="ACTIVE JOBS" />
                        <Stat value="276" label="APPLICANTS" />
                        <Stat value="12" label="INTERVIEWS" highlight />
                        <Stat value="4" label="OFFERS SENT" />
                    </div>
                </div>
            </div>

            {/* Body Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Column */}
                <div className="xl:col-span-2 space-y-8">
                    {/* About */}
                    <Card title="ABOUT COMPANY">
                        {editing ? (
                            <textarea
                                value={editForm.about}
                                onChange={(e) => setEditForm(p => ({ ...p, about: e.target.value }))}
                                className="w-full h-28 border-[2px] border-black rounded-xl p-4 font-bold text-xs outline-none focus:shadow-[4px_4px_0px_0px_#1E499D] transition-all bg-nile-white/40 resize-none"
                            />
                        ) : (
                            <p className="font-bold text-nile-blue/80 leading-relaxed text-[11px] uppercase">{profile.about}</p>
                        )}
                    </Card>

                    {/* Products */}
                    <Card title="PRODUCTS & OFFERINGS">
                        <div className="space-y-3">
                            {(editing ? editForm : profile).products.map((p) => (
                                <div key={p.id} className="p-4 border-[2px] border-black rounded-2xl bg-nile-white/30 hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                                    {editing ? (
                                        <div className="space-y-2">
                                            <input value={p.name} onChange={(e) => setEditForm(prev => ({ ...prev, products: prev.products.map(x => x.id === p.id ? { ...x, name: e.target.value } : x) }))} className="w-full border-[2px] border-black rounded-lg p-2 font-black text-xs uppercase outline-none" />
                                            <input value={p.desc} onChange={(e) => setEditForm(prev => ({ ...prev, products: prev.products.map(x => x.id === p.id ? { ...x, desc: e.target.value } : x) }))} className="w-full border-[2px] border-black rounded-lg p-2 font-bold text-xs outline-none" />
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-xs font-black uppercase tracking-widest text-black mb-1">{p.name}</p>
                                            <p className="text-[9px] font-bold text-nile-blue/60 leading-relaxed">{p.desc}</p>
                                        </>
                                    )}
                                </div>
                            ))}
                            {editing && (
                                <button onClick={() => setEditForm(prev => ({ ...prev, products: [...prev.products, { id: Date.now(), name: '', desc: '' }] }))} className="w-full py-3 border-[2px] border-dashed border-black rounded-2xl text-[9px] font-black text-black/30 hover:text-black hover:bg-black/5 transition-all uppercase flex items-center justify-center space-x-2">
                                    <Plus size={14} strokeWidth={3} /><span>ADD PRODUCT</span>
                                </button>
                            )}
                        </div>
                    </Card>

                    {/* Key Contacts */}
                    <Card title="KEY CONTACTS">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {profile.contacts.map((c) => (
                                <div key={c.id} className="flex items-center space-x-3 p-4 border-[2px] border-black rounded-2xl hover:bg-nile-white/60 transition-all">
                                    <div className="w-10 h-10 bg-nile-white border-[2px] border-black rounded-xl flex items-center justify-center flex-shrink-0">
                                        <UserRound size={20} className="text-black/40" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-black uppercase tracking-wide">{c.name}</p>
                                        <p className="text-[7px] font-black text-nile-blue/40 uppercase tracking-widest">{c.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card title="COMPANY LINKS">
                        <div className="space-y-4">
                            <LinkRow icon={<Globe size={14} />} label="WEBSITE" value={editing ? undefined : profile.website}>
                                {editing && <input value={editForm.website} onChange={e => setEditForm(p => ({ ...p, website: e.target.value }))} className="w-full border-[2px] border-black rounded-lg p-2 font-black text-xs outline-none" />}
                            </LinkRow>
                            <LinkRow icon={<Link2 size={14} />} label="LINKEDIN" value={editing ? undefined : profile.linkedin}>
                                {editing && <input value={editForm.linkedin} onChange={e => setEditForm(p => ({ ...p, linkedin: e.target.value }))} className="w-full border-[2px] border-black rounded-lg p-2 font-black text-xs outline-none" />}
                            </LinkRow>
                        </div>
                    </Card>

                    <Card title="RECRUITER">
                        <div className="flex items-center space-x-3">
                            <Avatar name={recruiterName} size="sm" />
                            <div>
                                <p className="text-[9px] font-black text-black uppercase">{recruiterName}</p>
                                <p className="text-[7px] font-black text-nile-blue/40 uppercase">LEAD RECRUITER</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const Stat = ({ value, label, highlight = false }: { value: string; label: string; highlight?: boolean }) => (
    <div>
        <p className={`text-xl font-black leading-none ${highlight ? 'text-nile-green' : 'text-black'}`}>{value}</p>
        <p className="text-[7px] font-black text-nile-blue/40 uppercase tracking-[0.15em] mt-1">{label}</p>
    </div>
);

const LinkRow = ({ icon, label, value, children }: { icon: React.ReactNode; label: string; value?: string; children?: React.ReactNode }) => (
    <div>
        <p className="text-[7px] font-black text-black/30 uppercase tracking-[0.2em] flex items-center gap-1.5 mb-1.5">{icon} {label}</p>
        {value ? <a href={`https://${value}`} target="_blank" rel="noreferrer" className="text-[9px] font-black text-nile-blue underline">{value}</a> : children}
    </div>
);

export default EmployerProfile;
