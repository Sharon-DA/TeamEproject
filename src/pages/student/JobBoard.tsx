import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Search, MapPin, DollarSign, Clock, SlidersHorizontal, Bookmark, ExternalLink } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import QuickApplyModal from '../../components/QuickApplyModal';
import Button from '../../components/Button';

const jobs = [
    { id: 1, company: 'TECH INNOVATIONS INC.', title: 'Frontend Engineer', location: 'Lagos, Nigeria', salary: '₦200k – ₦350k/mo', type: 'FULL-TIME', tags: ['React', 'TypeScript'], logo: 'TI', saved: true },
    { id: 2, company: 'GLOBAL SOLUTIONS LTD.', title: 'Backend Developer', location: 'Remote', salary: '₦180k – ₦300k/mo', type: 'REMOTE', tags: ['Node.js', 'PostgreSQL'], logo: 'GS', saved: false },
    { id: 3, company: 'INNOVATE HUB', title: 'Product Designer', location: 'Abuja, Nigeria', salary: '₦150k – ₦250k/mo', type: 'HYBRID', tags: ['Figma', 'UX Research'], logo: 'IH', saved: false },
    { id: 4, company: 'NEXUS TECH', title: 'Data Analyst Intern', location: 'Port Harcourt, Nigeria', salary: '₦80k – ₦120k/mo', type: 'INTERNSHIP', tags: ['Python', 'SQL', 'Excel'], logo: 'NT', saved: false },
];

const typeColors: Record<string, string> = {
    'FULL-TIME': 'bg-nile-green text-black',
    'REMOTE': 'bg-nile-blue text-white shadow-[2px_2px_0px_0px_#6CBB56]',
    'HYBRID': 'bg-nile-white text-black border-[1.5px] border-black',
    'INTERNSHIP': 'bg-black text-white',
};

const JobBoard = () => {
    const [search, setSearch] = useState('');
    const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
    const [isApplyModalOpen, setApplyModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleQuickApply = (job: typeof jobs[0]) => {
        setSelectedJob(job);
        setApplyModalOpen(true);
    };

    return (
        <DashboardLayout>
            <div className="p-8 space-y-10 anime-fade-in font-sans pb-20 text-left h-full">
                {/* Header */}
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 border-b-[2px] border-black pb-8">
                    <div className="space-y-1">
                        <h2 className="text-4xl font-black text-black leading-none uppercase tracking-tighter">Job Board .</h2>
                        <p className="text-[10px] font-black text-nile-blue/50 uppercase tracking-[0.2em]">BROWSE ACTIVE CAREER OPPORTUNITIES</p>
                    </div>
                    
                    <div className="flex items-center space-x-3 w-full xl:w-auto">
                        <div className="relative group flex-1 xl:w-64">
                            <Search size={14} strokeWidth={3} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 group-focus-within:text-black transition-colors" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="SEARCH ROLES..."
                                className="w-full bg-nile-white/40 border-[2px] border-black rounded-xl py-3 pl-11 pr-4 font-black text-[9px] uppercase outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#1E499D] transition-all"
                            />
                        </div>
                        <Button variant="outline" size="sm">
                             <SlidersHorizontal size={14} className="mr-2" /> FILTER
                        </Button>
                    </div>
                </div>

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {jobs.filter(j => 
                        j.title.toLowerCase().includes(search.toLowerCase()) ||
                        j.company.toLowerCase().includes(search.toLowerCase())
                    ).map(job => (
                        <JobCard 
                            key={job.id} 
                            job={job} 
                            onNavigate={() => navigate(`/student/jobs/${job.id}`)} 
                            onApply={() => handleQuickApply(job)}
                        />
                    ))}
                </div>

                {selectedJob && (
                    <QuickApplyModal 
                        isOpen={isApplyModalOpen} 
                        onClose={() => setApplyModalOpen(false)} 
                        jobTitle={selectedJob.title} 
                        company={selectedJob.company} 
                    />
                )}
            </div>
        </DashboardLayout>
    );
};

const JobCard = ({ job, onNavigate, onApply }: { job: typeof jobs[0], onNavigate: () => void, onApply: () => void }) => {
    const { showToast } = useToast();
    const [isSaved, setIsSaved] = useState(job.saved);

    const handleSave = () => {
        setIsSaved(!isSaved);
        showToast(isSaved ? 'Job archived' : 'Job bookmarked', 'success');
    };

    return (
        <div className="bg-white p-6 rounded-[24px] border-[2px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all group flex flex-col text-left">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-nile-blue text-nile-white flex items-center justify-center text-sm font-black border-[2px] border-black shadow-[2px_2px_0px_0px_#6CBB56]">
                        {job.logo}
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-black uppercase leading-none tracking-tighter">{job.title}</h3>
                        <p className="text-[10px] font-bold text-nile-blue/50 uppercase mt-1 tracking-widest leading-none">{job.company}</p>
                    </div>
                </div>
                <button 
                    onClick={handleSave}
                    className={`p-2 border-[2px] border-black rounded-lg transition-all ${isSaved ? 'bg-nile-green text-black' : 'bg-white hover:bg-black/5'}`}
                >
                    <Bookmark size={14} strokeWidth={3} fill={isSaved ? 'currentColor' : 'none'} />
                </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2 text-[9px] font-black text-black/60 uppercase">
                    <MapPin size={12} strokeWidth={3} className="text-nile-blue" />
                    <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-[9px] font-black text-black/60 uppercase">
                    <DollarSign size={12} strokeWidth={3} className="text-nile-green" />
                    <span>{job.salary}</span>
                </div>
                <div className="flex items-center">
                    <span className={`text-[7px] font-black px-2 py-0.5 rounded-full border-[1.5px] border-black ${typeColors[job.type]}`}>{job.type}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-8">
                {job.tags.map(tag => (
                    <span key={tag} className="text-[7px] font-black uppercase px-2 py-1 bg-nile-white border border-black/10 rounded-md tracking-tighter">{tag}</span>
                ))}
            </div>

            <div className="flex space-x-3 mt-auto">
                <Button fullWidth size="sm" onClick={onApply}>
                    QUICK APPLY
                </Button>
                <Button variant="outline" size="sm" onClick={onNavigate}>
                    VIEW <ExternalLink size={12} className="ml-1" />
                </Button>
            </div>
        </div>
    );
};

export default JobBoard;
