import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Send, MoreVertical, Search, Phone, Video, Smile, Paperclip } from 'lucide-react';
import Avatar from '../../components/Avatar';

const conversations = [
    { id: 1, name: 'Sarah Admin', lastMsg: 'Your CV has been approved!', time: '10:30 AM', unread: 1, online: true },
    { id: 2, name: 'Google Tech', lastMsg: 'Are you available for an interview?', time: '9:15 AM', unread: 3, online: false },
    { id: 3, name: 'Tunde Afolayan', lastMsg: 'Happy to connect!', time: 'Yesterday', unread: 0, online: true },
    { id: 4, name: 'Microsoft HR', lastMsg: 'Offer letter attached.', time: 'Monday', unread: 0, online: false },
];

const messagesMock = [
    { id: 1, text: 'Hi Grace! I reviewed your project.', sender: 'them', time: '10:00 AM' },
    { id: 2, text: 'Thank you Sarah! Any feedback?', sender: 'me', time: '10:05 AM' },
    { id: 3, text: 'It looks amazing! The Nile design logic is perfect.', sender: 'them', time: '10:10 AM' },
    { id: 4, text: 'Glad you like it! I just uploaded my latest CV too.', sender: 'me', time: '10:15 AM' },
];

const Messages = () => {
    const [activeChat, setActiveChat] = useState(conversations[0]);
    const [msg, setMsg] = useState('');

    return (
        <DashboardLayout>
            <div className="flex h-[calc(100vh-140px)] m-4 font-sans bg-white border-4 border-black rounded-[40px] overflow-hidden shadow-brutalist">
                
                {/* Conversations List (Sidebar) */}
                <div className="w-full md:w-[350px] border-r-4 border-black flex flex-col bg-nile-white">
                    <div className="p-8 border-b-4 border-black space-y-6">
                        <h2 className="text-3xl font-black text-black uppercase tracking-tight">Messages .</h2>
                        <div className="relative">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-nile-blue/50" />
                            <input 
                                type="text" 
                                placeholder="SEARCH CHATS..." 
                                className="w-full pl-12 pr-4 py-3 border-3 border-black rounded-xl font-bold text-xs uppercase outline-none focus:shadow-brutalist-sm"
                            />
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto">
                        {conversations.map(chat => (
                            <div 
                                key={chat.id} 
                                onClick={() => setActiveChat(chat)}
                                className={`p-6 flex items-center space-x-4 cursor-pointer transition-colors border-b-2 border-black/5
                                    ${activeChat.id === chat.id ? 'bg-white' : 'hover:bg-white/50'}
                                `}
                            >
                                <div className="relative">
                                    <Avatar name={chat.name} size="md" />
                                    {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-nile-green border-2 border-white rounded-full"></div>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-black text-black text-xs uppercase truncate leading-none mb-1">{chat.name}</h4>
                                        <span className="text-[8px] font-black text-nile-blue/50 uppercase">{chat.time}</span>
                                    </div>
                                    <p className={`text-[10px] truncate uppercase font-bold ${chat.unread > 0 ? 'text-black font-black' : 'text-nile-blue/60'}`}>
                                        {chat.lastMsg}
                                    </p>
                                </div>
                                {chat.unread > 0 && (
                                    <div className="w-5 h-5 bg-nile-blue text-white rounded-full flex items-center justify-center text-[8px] font-black">
                                        {chat.unread}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active Chat Area */}
                <div className="flex-1 flex flex-col bg-white">
                    {/* Chat Header */}
                    <div className="p-6 border-b-4 border-black flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Avatar name={activeChat.name} size="md" />
                            <div>
                                <h3 className="font-black text-black uppercase text-sm leading-none">{activeChat.name}</h3>
                                <div className="flex items-center space-x-1 mt-1">
                                    <div className={`w-2 h-2 rounded-full ${activeChat.online ? 'bg-nile-green' : 'bg-black/20'}`}></div>
                                    <span className="text-[9px] font-black text-nile-blue/50 uppercase">{activeChat.online ? 'Online' : 'Offline'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-3 bg-nile-white border-3 border-black rounded-xl hover:bg-black hover:text-white transition-all shadow-brutalist-sm"><Phone size={18} strokeWidth={2.5}/></button>
                            <button className="p-3 bg-nile-white border-3 border-black rounded-xl hover:bg-black hover:text-white transition-all shadow-brutalist-sm"><Video size={18} strokeWidth={2.5}/></button>
                            <button className="p-3 text-nile-blue/50"><MoreVertical size={20}/></button>
                        </div>
                    </div>

                    {/* Messages Window */}
                    <div className="flex-1 overflow-y-auto p-10 space-y-6 flex flex-col hide-scrollbar">
                        {messagesMock.map(m => (
                            <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] p-6 rounded-[30px] border-3 border-black shadow-brutalist-sm 
                                    ${m.sender === 'me' ? 'bg-nile-blue text-white rounded-tr-none' : 'bg-nile-white text-black rounded-tl-none'}
                                `}>
                                    <p className="font-bold text-sm uppercase leading-relaxed">{m.text}</p>
                                    <span className={`block mt-2 text-[8px] font-black uppercase text-right ${m.sender === 'me' ? 'text-white/60' : 'text-nile-blue/50'}`}>
                                        {m.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-8 border-t-4 border-black">
                        <div className="flex items-center space-x-4 bg-nile-white border-3 border-black rounded-[30px] p-2 pr-4 shadow-brutalist-sm focus-within:shadow-none transition-all">
                            <button className="p-4 text-nile-blue/50 hover:text-black hover:scale-110 transition-all"><Paperclip size={20}/></button>
                            <input 
                                type="text" 
                                placeholder="TYPE A MESSAGE..." 
                                className="flex-1 bg-transparent border-none outline-none font-black text-xs uppercase px-2"
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                            />
                            <button className="p-4 text-nile-blue/50 hover:text-black transition-all"><Smile size={20}/></button>
                            <button className="w-12 h-12 bg-nile-green text-black border-2 border-black rounded-full flex items-center justify-center shadow-brutalist-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                                <Send size={20} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default Messages;
