import React, { useState, useEffect, useRef } from 'react';
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
    MessageSquare,
    X,
    User,
    Bot,
    ChevronRight,
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
    const [showChat, setShowChat] = useState(false);
    
    // Chat state
    const [messages, setMessages] = useState([
        { id: 1, role: 'bot', text: 'HELLO. I AM THE CAREER ARCHITECT. I HAVE ANALYZED YOUR CV AND MAPPED YOUR POTENTIAL PATHWAYS. HOW CAN I ASSIST YOUR EVOLUTION TODAY?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (showChat) scrollToBottom();
    }, [messages, showChat]);

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

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = { id: Date.now(), role: 'user', text: inputValue.toUpperCase() };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        // Mock Bot Response
        setTimeout(() => {
            const botMsg = { 
                id: Date.now() + 1, 
                role: 'bot', 
                text: getBotResponse(inputValue) 
            };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    const getBotResponse = (input: string) => {
        const lower = input.toLowerCase();
        if (lower.includes('aws') || lower.includes('cloud')) return "THE AWS ARCHITECT PATHWAY REQUIRES HANDS-ON EXPERIENCE WITH S3, EC2, AND LAMBDA. I RECOMMEND COMPLETING THE 'AWS CLOUD PRACTITIONER' CERTIFICATION FIRST TO SECURE YOUR FOUNDATION.";
        if (lower.includes('gpa') || lower.includes('grade')) return "WHILE YOUR CURRENT GRADE IS STRONG, RECRUITERS IN TECH PRIORITIZE PROJECT PORTFOLIOS. FOCUS ON BUILDING A ROBUST GITHUB REPOSITORY TO COMPLEMENT YOUR ACADEMIC STANDING.";
        if (lower.includes('salary') || lower.includes('money')) return "FULL-STACK DEVELOPERS IN THE NIGERIAN TECH ECOSYSTEM CURRENTLY COMMAND ENTRY-LEVEL PACKAGES BETWEEN ₦250K - ₦450K. SPECIALIZING IN DEVOPS CAN INCREASE THIS BY 35%.";
        return "I HAVE PROCESSED YOUR QUERY. FOCUS ON ALIGNING YOUR SKILL GAPS WITH THE RECOMMENDED COURSES IN YOUR REPORT TO MAXIMIZE YOUR MARKET VALUE.";
    };

    return (
        <DashboardLayout>
            <div className="p-4 md:p-10 space-y-8 md:space-y-12 font-sans bg-nile-white min-h-full pb-24 text-left relative">
                
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
                                    <p className="text-base md:text-2xl font-black text-black leading-snug uppercase text-left">
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
                                    <div className="text-left">
                                        <p className="text-[10px] font-black text-black">AI ARCHITECT</p>
                                        <p className="text-[8px] font-black text-nile-blue/40 uppercase tracking-widest">PERSONALIZED INSIGHTS</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-xs font-bold text-nile-blue/70 uppercase leading-relaxed italic text-left">
                                        "I noticed you have strong Python experience. Have you considered a shift into Data Engineering? The market demand is 140% higher in Lagos currently."
                                    </p>
                                    <button 
                                        onClick={() => setShowChat(true)}
                                        className="w-full py-4 bg-nile-blue text-white border-2 border-black rounded-xl font-black text-[10px] hover:bg-black transition-all uppercase flex items-center justify-center space-x-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        <MessageSquare size={14} />
                                        <span>CHAT WITH ARCHITECT</span>
                                    </button>
                                </div>
                             </div>

                             <div className="bg-nile-green/5 border-3 border-black border-dashed rounded-[32px] p-8 text-center space-y-6">
                                <div className="w-16 h-16 bg-white border-2 border-black rounded-2xl flex items-center justify-center mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <Zap size={28} className="text-nile-green" />
                                </div>
                                <div className="space-y-2">
                                     <h5 className="text-sm font-black text-black uppercase tracking-tight">Expert Consultation</h5>
                                     <p className="text-[10px] font-bold text-nile-blue/40 uppercase tracking-widest leading-relaxed">Get customized feedback from a professional advisor.</p>
                                </div>
                                {!requestedConsultation ? (
                                    <Button onClick={handleRequestConsultation} fullWidth size="sm" variant="outline">REQUEST HUMAN REVIEW</Button>
                                ) : (
                                    <div className="text-[10px] font-black text-nile-green uppercase tracking-widest border-2 border-nile-green py-2 rounded-xl">SYSTEM STATUS: SENT</div>
                                )}
                             </div>
                        </div>
                    </div>
                )}

                {/* --- FLOATING CHAT INTERFACE --- */}
                {showChat && (
                    <div className="fixed bottom-6 right-6 z-[100] w-[calc(100vw-48px)] md:w-96 flex flex-col bg-white border-4 border-black rounded-[32px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] h-[500px] anime-slide-up">
                        {/* Chat Header */}
                        <div className="p-5 border-b-4 border-black flex items-center justify-between bg-black text-white rounded-t-[28px]">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-nile-green rounded-lg flex items-center justify-center border-2 border-white">
                                    <Cpu size={16} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-tighter">Career Architect Bot</p>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-1.5 h-1.5 bg-nile-green rounded-full animate-pulse"></div>
                                        <span className="text-[7px] font-black opacity-50 uppercase tracking-widest">ONLINE • PROCESSING</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setShowChat(false)} className="p-1 hover:text-nile-green transition-colors">
                                <X size={20} strokeWidth={3} />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-nile-white/20">
                            {messages.map((m) => (
                                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`
                                        max-w-[85%] p-4 border-2 border-black rounded-2xl text-[9px] font-black leading-relaxed uppercase
                                        ${m.role === 'user' 
                                            ? 'bg-nile-blue text-white rounded-tr-none shadow-[2px_2px_0px_0px_rgba(108,187,86,1)]' 
                                            : 'bg-white text-black rounded-tl-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}
                                    `}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Chat Input */}
                        <form onSubmit={handleSendMessage} className="p-4 border-t-4 border-black bg-white rounded-b-[28px]">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="ASK ABOUT SKILLS, SALARY, PATHS..." 
                                    className="w-full bg-nile-white border-[2px] border-black rounded-xl py-3 pl-4 pr-12 font-black text-[9px] uppercase outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                                />
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-lg hover:bg-nile-blue transition-colors">
                                    <Send size={14} />
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Floating Action Button for chat (if chat is hidden and result is ready) */}
                {resultReady && !showChat && (
                    <button 
                        onClick={() => setShowChat(true)}
                        className="fixed bottom-24 md:bottom-8 right-6 z-50 w-14 h-14 bg-nile-green text-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center group hover:-translate-y-1 transition-all"
                    >
                        <MessageSquare className="group-hover:scale-120 transition-transform" size={24} />
                    </button>
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
    <div className={`bg-white border-3 border-black rounded-[28px] p-6 md:p-8 flex flex-col transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-brutalist-sm ${alert ? 'border-red-500/20' : ''} text-left`}>
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
    <div className="flex gap-6 group text-left">
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
