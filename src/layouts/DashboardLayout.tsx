import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
    Home, 
    MessageSquare, 
    Briefcase, 
    GraduationCap, 
    LayoutList, 
    Calendar, 
    User, 
    LogOut,
    Mail,
    Bell,
    Search,
    Users,
    ChevronRight
} from 'lucide-react';
import Avatar from '../components/Avatar';
import NotificationTray from '../components/NotificationTray';
import { useAuth } from '../context/AuthContext';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const SlimNavItem = ({ to, icon, label, isActive }: { to: string, icon: React.ReactNode, label: string, isActive: boolean }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(to)}
            className={`
                w-full flex flex-col items-center justify-center transition-all group py-3 relative cursor-pointer
                ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'}
            `}
        >
            {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-nile-blue rounded-r-full animate-in slide-in-from-left-1" />
            )}
            <div className={`
                w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300
                ${isActive 
                    ? 'bg-nile-blue text-white shadow-[2px_2px_0px_0px_rgba(108,187,86,1)] border-[2px] border-black' 
                    : 'bg-transparent text-black border-2 border-transparent group-hover:bg-nile-white group-hover:border-black'}
            `}>
                {React.cloneElement(icon as React.ReactElement, { size: 20 })}
            </div>
            <span className={`
                text-[7px] font-black tracking-[0.1em] mt-1.5 transition-colors
                ${isActive ? 'text-nile-blue' : 'text-black opacity-40 group-hover:opacity-100'}
            `}>
                {label}
            </span>
        </div>
    );
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);
    const [progress, setProgress] = useState(0);

    // Fallback if no user
    const userName = user?.name || 'USER';
    const userType = user?.type;
    const userDept = user?.department;
    const displayInfo = userType === 'alumni'
        ? 'ALUMNI • CLASS OF 2024'
        : userDept
        ? userDept.toUpperCase()
        : 'L400 • CS';

    useEffect(() => {
        setProgress(30);
        const timer = setTimeout(() => setProgress(100), 400);
        return () => {
            clearTimeout(timer);
            setProgress(0);
        };
    }, [location.pathname]);

    const breadcrumbs = location.pathname.split('/').filter(x => x && x !== 'student');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-nile-white text-black font-sans overflow-hidden">
            <div 
                className="fixed top-0 left-0 h-0.5 bg-nile-blue transition-all duration-500 z-[100]" 
                style={{ width: `${progress}%`, opacity: progress === 100 ? 0 : 1 }}
            />

            {/* Compact Instagram-Style Sidebar */}
            <aside className="w-[84px] bg-white border-r-[2px] border-black flex flex-col items-center py-6 z-30 flex-shrink-0">
                <div 
                    onClick={() => navigate('/student')}
                    className="w-10 h-10 bg-nile-blue rounded-xl flex items-center justify-center text-white font-black text-sm shadow-[2px_2px_0px_0px_rgba(108,187,86,1)] border-[2px] border-black mb-8 flex-shrink-0 cursor-pointer hover:rotate-6 transition-transform"
                >
                    NC
                </div>
                
                <nav className="flex-1 flex flex-col items-center space-y-1 w-full custom-scrollbar overflow-y-auto px-1">
                    <SlimNavItem to="/student" icon={<Home />} label="HOME" isActive={location.pathname === '/student'} />
                    <SlimNavItem to="/student/feed" icon={<MessageSquare />} label="FEED" isActive={location.pathname === '/student/feed'} />
                    <SlimNavItem to="/student/network" icon={<Users />} label="NET" isActive={location.pathname === '/student/network'} />
                    <SlimNavItem to="/student/messages" icon={<Mail />} label="MAIL" isActive={location.pathname === '/student/messages'} />
                    <SlimNavItem to="/student/jobs" icon={<Briefcase />} label="JOBS" isActive={location.pathname === '/student/jobs'} />
                    <SlimNavItem to="/student/career" icon={<GraduationCap />} label="GROW" isActive={location.pathname === '/student/career'} />
                    <SlimNavItem to="/student/applications" icon={<LayoutList />} label="APPS" isActive={location.pathname === '/student/applications'} />
                    <SlimNavItem to="/student/events" icon={<Calendar />} label="LIVE" isActive={location.pathname === '/student/events'} />
                    <SlimNavItem to="/student/profile" icon={<User />} label="PROFILE" isActive={location.pathname === '/student/profile'} />
                </nav>

                <div className="mt-auto pt-4 border-t-[2px] border-black/5 w-full flex flex-col items-center space-y-4">
                    <button
                        onClick={handleLogout}
                        className="opacity-40 hover:opacity-100 transition-all text-red-500"
                    >
                        <LogOut size={18} />
                    </button>
                    <div className="w-9 h-9 rounded-full border-[2px] border-black/10 overflow-hidden cursor-pointer hover:border-nile-blue transition-colors" onClick={() => navigate('/student/profile')}>
                        <Avatar name={userName} size="sm" />
                    </div>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-white h-full relative">
                <header className="h-14 border-b-[2px] border-black flex items-center justify-between px-6 bg-white/80 backdrop-blur-md z-20 flex-shrink-0">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center text-[9px] font-black uppercase tracking-widest text-black/40">
                            <span className="hover:text-nile-blue cursor-pointer transition-colors" onClick={() => navigate('/student')}>STUDENT HUB</span>
                            {breadcrumbs.map((crumb, i) => (
                                <React.Fragment key={crumb}>
                                    <ChevronRight size={10} className="mx-2 opacity-30" />
                                    <span className={i === breadcrumbs.length - 1 ? 'text-black' : 'hover:text-black transition-colors'}>
                                        {crumb.replace('-', ' ')}
                                    </span>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                        <div className="relative group">
                            <Search size={14} strokeWidth={3} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30 group-focus-within:text-nile-blue transition-colors" />
                            <input 
                                type="text" 
                                placeholder="QUICK SEARCH..." 
                                className="w-56 bg-nile-white border-[2px] border-black rounded-lg py-1.5 pl-10 pr-3 font-black text-[9px] uppercase outline-none focus:shadow-[2px_2px_0px_0px_#1E499D] transition-all"
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                             <button className="p-2 text-black/40 hover:text-black transition-colors"><Mail size={18} /></button>
                             <button 
                                onClick={() => setShowNotifications(!showNotifications)}
                                className={`p-2 transition-all relative ${showNotifications ? 'text-nile-blue' : 'text-black/40 hover:text-black'}`}
                            >
                                <Bell size={18} />
                                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-nile-green border-2 border-white rounded-full"></span>
                            </button>
                            
                            {showNotifications && (
                                <div className="absolute top-full right-8 mt-2 z-50 animate-in fade-in slide-in-from-top-1 scale-95 origin-top-right">
                                    <NotificationTray onClose={() => setShowNotifications(false)} />
                                </div>
                            )}

                            <div className="h-5 w-[1px] bg-black/5" />

                            <div className="flex items-center space-x-2.5 cursor-pointer group" onClick={() => navigate('/student/profile')}>
                                <div className="text-right hidden sm:block">
                                    <p className="text-[9px] font-black uppercase leading-none">{userName}</p>
                                    <p className="text-[7px] font-bold text-nile-blue/50 uppercase mt-0.5 tracking-wider">{displayInfo}</p>
                                </div>
                                <div className="w-8 h-8 rounded-lg border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(108,187,86,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all overflow-hidden text-left">
                                     <Avatar name={userName} size="sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto bg-nile-white/20 scroll-smooth custom-scrollbar">
                    <div className="max-w-[1240px] mx-auto min-h-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
