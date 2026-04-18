import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { 
    Cpu, 
    Zap, 
    Target, 
    BookOpen, 
    Award, 
    ArrowUpRight, 
    FileText, 
    CheckCircle2, 
    AlertCircle, 
    Sparkles, 
    Send,
    ChevronDown,
    MapPin,
    Search
} from 'lucide-react';
import Button from '../../components/Button';
import { useToast } from '../../context/ToastContext';
import Avatar from '../../components/Avatar';

const AICounselor = () => {
    const { showToast } = useToast();
    const [analyzing, setAnalyzing] = useState(false);
    const [resultReady, setResultReady] = useState(false);
    const [requestedConsultation, setRequestedConsultation] = useState(false);

    const handleAnalyze = () => {
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            setResultReady(true);
            showToast('AI Analysis Complete!', 'success');
        }, 2000);
    };

    const handleRequestConsultation = () => {
        setRequestedConsultation(true);
        showToast('Consultation request sent to Career Services.', 'success');
    };

    return (
        <DashboardLayout>
            <div className="p-4 md:p-10 space-y-8 md:space-y-12 font-sans bg-nile-white min-h-full pb-24 text-left">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-[2px] md:border-b-[3px] border-black pb-8 md:pb-12">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-3 text-nile-green">
                            <Cpu size={24} strokeWidth={2.5} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">NEURAL ENGINE V2.0</span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black text-black leading-none uppercase tracking-tighter">Career Architect .</h2>
                        <p className="text-sm md:text-xl font-bold text-nile-blue/70 uppercase tracking-widest max-w-2xl">
                            AI-driven CV analysis, skill-gap mapping, and professional growth pathways.
                        </p>
                    </div>
                    {resultReady && !requestedConsultation && (
                        <div className="flex flex-col items-end gap-2 animate-bounce">
                             <span className="text-[8px] font-black text-nile-blue uppercase">Need human advice?</span>
                             <Button onClick={handleRequestConsultation} variant="primary" size="sm md:lg" className="bg-black text-white hover:bg-nile-blue">
                                <Send size={18} className="mr-2" /> REQUEST CONSULTATION
                             </Button>
                        </div>
                    )}
                    {requestedConsultation && (
                         <div className="bg-nile-green/10 border-2 border-nile-green p-4 rounded-xl flex items-center space-x-3">
                             <CheckCircle2 className="text-nile-green" size={20} />
                             <span className="text-[10px] font-black text-nile-green uppercase">REQUEST SENT TO STAFF</span>
                         </div>
                    )}
                </div>

                {!resultReady ? (
                    <div className="max-w-4xl mx-auto space-y-12 py-12 text-center">
                         <div className="w-32 h-32 md:w-48 md:h-48 bg-white border-4 border-black rounded-[40px] flex items-center justify-center mx-auto shadow-[12px_12px_0px_0px_#6CBB56] relative overflow-hidden group">
                            <FileText size={48} md:size={64} className="text-black group-hover:scale-110 transition-transform" />
                            {analyzing && <div className="absolute inset-0 bg-nile-green/20 animate-pulse border-b-4 border-nile-green"></div>}
                         </div>
                         <div className="space-y-4">
                            <h3 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight leading-none">Ready to Evolve?</h3>
                            <p className="text-[10px] md:text-xs font-black text-nile-blue/40 uppercase tracking-[0.2em] leading-relaxed max-w-md mx-auto italic">
                                "Analysis should be intentional. Once you're ready, let the Architect map your professional future."
                            </p>
                         </div>
                         <Button 
                            onClick={handleAnalyze} 
                            isLoading={analyzing}
                            size="lg" 
                            className="px-12 md:px-20 text-xl shadow-[8px_8px_0px_0px_rgba(30,73,157,1)]"
                        >
                            {analyzing ? 'SCANNING NEURAL PATHS...' : 'LAUNCH AI ANALYSIS'}
                         </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-4">
                        {/* LEFT COLUMN: The Report Card */}
                        <div className="lg:col-span-8 space-y-8 md:space-y-12">
                            {/* Executive Summary */}
                            <div className="bg-white border-3 border-black rounded-[32px] md:rounded-[48px] p-6 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-8 items-start">
                                <div className="space-y-6 flex-1">
                                    <h4 className="text-xs font-black text-nile-blue/40 uppercase tracking-[0.3em]">EXECUTIVE SUMMARY</h4>
                                    <p className="text-base md:text-2xl font-black text-black leading-snug uppercase">
                                        Your profile shows strong foundations in <span className="text-nile-blue">Technical Implementation</span>, but lacks <span className="text-red-500">Domain-Specific Certifications</span> for high-tier recruitment.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <Badge label="RECRUITMENT READY: 78%" />
                                        <Badge label="MARKET STRENGTH: HIGH" />
                                        <Badge label="NEXT STEP: CERTIFICATION" />
                                    </div>
                                </div>
                                <div className="w-full md:w-32 flex flex-col items-center justify-center p-6 bg-black text-white rounded-[24px] border-2 border-black border-dashed">
                                    <span className="text-4xl font-black">B+</span>
                                    <span className="text-[8px] font-black uppercase tracking-widest mt-2">CV GRADE</span>
                                </div>
                            </div>

                            {/* Detailed Analysis Grids */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <AnalysisCard 
                                    icon={<Target className="text-nile-blue" />} 
                                    title="CAREER PATHS" 
                                    items={['FULL-STACK DEVELOPER', 'DEVOPS ENGINEER', 'TECHNICAL PRODUCT OWNER']}
                                />
                                <AnalysisCard 
                                    icon={<AlertCircle className="text-red-500" />} 
                                    title="SKILL GAPS" 
                                    items={['CLOUD INFRASTRUCTURE (AWS/AZURE)', 'ADVANCED SYSTEM DESIGN', 'TEAM LEADERSHIP']}
                                    alert
                                />
                                <AnalysisCard 
                                    icon={<BookOpen className="text-nile-green" />} 
                                    title="COURSES TO DO" 
                                    items={['UDEMY: AWS CERTIFIED ARCHITECT', 'NILE: LEADERSHIP MASTERCLASS', 'COURSERA: DISTRIBUTED SYSTEMS']}
                                />
                                <AnalysisCard 
                                    icon={<Award className="text-nile-blue" />} 
                                    title="CERTIFICATES" 
                                    items={['AWS CLOUD PRACTITIONER', 'GOOGLE DATA ANALYTICS', 'ITIL V4 FOUNDATION']}
                                />
                            </div>

                            {/* CV Optimization Card */}
                            <div className="bg-black text-white border-4 border-black rounded-[32px] md:rounded-[40px] p-8 md:p-12 shadow-[12px_12px_0px_0px_#6CBB56]">
                                <div className="flex items-center space-x-4 mb-8">
                                    <Sparkles className="text-nile-green" size={28} />
                                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">CV OPTIMIZATION PLAN</h3>
                                </div>
                                <ul className="space-y-6">
                                    <OptimizationStep 
                                        num="01" 
                                        task="QUANTIFY ACHIEVEMENTS" 
                                        desc="Instead of 'Built apps', use 'Built 3 React apps serving 500+ users with 15% faster load times'." 
                                    />
                                    <OptimizationStep 
                                        num="02" 
                                        task="KEYWORDS ADJUSTMENT" 
                                        desc="Add keywords like 'Microservices', 'CI/CD Pipelines' and 'PostgreSQL' to pass ATS filters." 
                                    />
                                    <OptimizationStep 
                                        num="03" 
                                        task="PROFESSIONAL SUMMARY" 
                                        desc="Rewrite the header to focus on 'Software Engineering' impact rather than just 'Student'." 
                                    />
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Insights & Actions */}
                        <div className="lg:col-span-4 space-y-8">
                             <div className="bg-white border-3 border-black rounded-[32px] p-8 shadow-brutalist space-y-6">
                                <div className="flex items-center space-x-3 pb-4 border-b-2 border-dashed border-black/10">
                                    <Avatar name="Career AI" size="sm" />
                                    <div>
                                        <p className="text-[10px] font-black text-black">AI ARCHITECT</p>
                                        <p className="text-[8px] font-black text-nile-blue/40 uppercase tracking-widest">PERSONALIZED INSIGHTS</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-xs font-bold text-nile-blue/70 uppercase leading-relaxed italic">
                                        "I noticed you have strong Python experience. Have you considered a shift into Data Engineering? The market demand is 140% higher in Lagos currently."
                                    </p>
                                    <button className="w-full py-4 bg-nile-white border-2 border-black rounded-xl font-black text-[10px] hover:bg-black hover:text-white transition-all uppercase flex items-center justify-center space-x-2">
                                        <span>SEE DATA INSIGHTS</span>
                                        <ArrowUpRight size={14} />
                                    </button>
                                </div>
                             </div>

                             <div className="bg-nile-green/5 border-3 border-black border-dashed rounded-[32px] p-8 text-center space-y-6">
                                <div className="w-16 h-16 bg-white border-2 border-black rounded-2xl flex items-center justify-center mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <Zap size={28} className="text-nile-green" />
                                </div>
                                <div className="space-y-2">
                                     <h5 className="text-sm font-black text-black uppercase tracking-tight">Expert Consultation</h5>
                                     <p className="text-[10px] font-bold text-nile-blue/40 uppercase tracking-widest">Get customized feedback from a professional career advisor.</p>
                                </div>
                                {!requestedConsultation ? (
                                    <Button onClick={handleRequestConsultation} fullWidth size="sm" variant="outline">REQUEST REVIEW</Button>
                                ) : (
                                    <div className="text-[10px] font-black text-nile-green uppercase tracking-widest border-2 border-nile-green py-2 rounded-xl">SYSTEM STATUS: SENT</div>
                                )}
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

const Badge = ({ label }: { label: string }) => (
    <span className="px-3 py-1 bg-nile-white border-2 border-black rounded-lg text-[8px] md:text-[9px] font-black text-black uppercase tracking-widest shadow-sm">
        {label}
    </span>
);

const AnalysisCard = ({ icon, title, items, alert = false }: { icon: React.ReactNode, title: string, items: string[], alert?: boolean }) => (
    <div className={`bg-white border-3 border-black rounded-[28px] p-6 md:p-8 flex flex-col transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-brutalist-sm ${alert ? 'border-red-500/20' : ''}`}>
        <div className="flex items-center space-x-3 mb-6">
            <div className="p-2.5 bg-nile-white border-2 border-black rounded-xl">
                {icon}
            </div>
            <h4 className="text-[11px] md:text-sm font-black text-black uppercase tracking-widest">{title}</h4>
        </div>
        <ul className="space-y-3 flex-1">
            {items.map((it, i) => (
                <li key={i} className="flex items-start space-x-2 text-[9px] md:text-[10px] font-black text-nile-blue/60 uppercase group">
                    <ChevronDown size={14} className="-rotate-90 text-black/20 group-hover:text-black transition-colors" />
                    <span className="group-hover:text-black transition-colors">{it}</span>
                </li>
            ))}
        </ul>
    </div>
);

const OptimizationStep = ({ num, task, desc }: { num: string, task: string, desc: string }) => (
    <div className="flex gap-6 group">
        <div className="flex-shrink-0 w-10 md:w-12 h-10 md:h-12 bg-white text-black border-2 border-black rounded-xl flex items-center justify-center font-black text-sm group-hover:bg-nile-green transition-colors">
            {num}
        </div>
        <div className="space-y-1">
            <h5 className="text-xs md:text-sm font-black text-nile-green uppercase tracking-tight">{task}</h5>
            <p className="text-[9px] md:text-[10px] font-bold text-white/50 uppercase leading-relaxed tracking-wider">{desc}</p>
        </div>
    </div>
);

export default AICounselor;
