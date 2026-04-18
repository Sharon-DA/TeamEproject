import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Mail, User } from 'lucide-react';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import AuthLayout from '../../layouts/AuthLayout';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { showToast } = useToast();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<'student' | 'staff' | 'employer'>('student');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        setTimeout(() => {
            login({
                name: (username || 'USER').toUpperCase(),
                role: role,
                email: email,
                company: role === 'employer' ? 'Google Tech' : undefined,
                department: role === 'staff' ? 'Career Services' : undefined
            });

            showToast(`Welcome back, ${username || 'User'}!`, 'success');
            const route = role === 'student' ? '/student' : role === 'staff' ? '/staff' : '/employer';
            navigate(route);
        }, 1000);
    };

    const leftPanelContent = (
        <div className="flex flex-col items-center text-center">
            <div className="relative z-10 w-24 h-24 bg-white border-[2px] border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(108,187,86,1)] flex items-center justify-center mb-10">
                <KeyRound size={48} strokeWidth={2.5} className="text-black" />
            </div>

            <div className="space-y-1">
                <p className="text-xl font-black text-white uppercase tracking-[0.2em] leading-none">Nile Connect</p>
                <p className="text-[8px] font-black text-white/50 uppercase tracking-[0.4em]">Propelling Futures</p>
            </div>
        </div>
    );

    return (
        <AuthLayout leftContent={leftPanelContent}>
            <div className="max-w-sm mx-auto w-full space-y-10 anime-fade-in text-left">
                {/* Heading */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-black uppercase tracking-tight">Login Hub</h1>
                    <p className="text-[9px] font-black text-nile-blue uppercase tracking-[0.2em]">
                        ENTER AUTHORIZED CREDENTIALS
                    </p>
                </div>

                {/* Professional Role Selection */}
                <div className="flex bg-nile-white/40 p-1 rounded-xl border-[2px] border-black shadow-sm">
                    {(['student', 'staff', 'employer'] as const).map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r)}
                            className={`flex-1 py-3 font-black uppercase tracking-widest text-[8px] rounded-lg transition-all ${
                                role === r 
                                ? 'bg-nile-blue text-white shadow-[2px_2px_0px_0px_#6CBB56] border-2 border-black' 
                                : 'text-nile-blue/40 hover:text-black'
                            }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField 
                        label="NILE ID / USERNAME" 
                        icon={<User size={16} />}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="E.G. GRACE.STANLEY"
                        required
                    />

                    <InputField 
                        label="VERIFIED EMAIL" 
                        icon={<Mail size={16} />}
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="STUDENT@NILE.EDU.NG"
                        required
                    />

                    <div className="pt-2">
                        <Button 
                            type="submit" 
                            fullWidth 
                            size="md" 
                            isLoading={isLoading}
                        >
                            CONTINUE TO HUB
                        </Button>
                    </div>
                </form>

                {/* Footer Link */}
                <div className="pt-8 border-t-[2px] border-black/5 text-center">
                    <p className="text-[9px] font-black text-black/30 uppercase tracking-[0.15em] mb-4">NEW TO NILE CONNECT?</p>
                    <button 
                        onClick={() => navigate('/join-as')}
                        className="text-[10px] font-black text-nile-blue hover:text-nile-green transition-colors uppercase tracking-[0.2em] border-b-[1px] border-nile-blue/20 hover:border-nile-green pb-0.5"
                    >
                        CREATE PROFESSIONAL PROFILE
                    </button>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Login;
