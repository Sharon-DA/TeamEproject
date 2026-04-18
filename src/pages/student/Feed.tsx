import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { MessageCircle, Plus } from 'lucide-react';
import Feed from '../../components/Feed';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import InputField from '../../components/InputField';

const StudentFeed = () => {
    const [isPostModalOpen, setPostModalOpen] = useState(false);

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-12 px-6 space-y-12 anime-fade-in font-sans bg-nile-white min-h-full">
                {/* Header Section */}
                <div className="flex justify-between items-end mb-16">
                    <div className="flex items-center space-x-6 group">
                        <div className="w-16 h-16 bg-nile-blue rounded-[20px] flex items-center justify-center text-white shadow-brutalist-sm-green group-hover:rotate-6 transition-transform">
                            <MessageCircle size={32} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-5xl font-black text-black leading-none uppercase tracking-tight">FEED</h2>
                            <p className="text-sm font-black text-nile-blue uppercase mt-2 tracking-widest">Connect with your community</p>
                        </div>
                    </div>
                    <Button onClick={() => setPostModalOpen(true)} variant="secondary">
                        <Plus size={18} strokeWidth={2.5} /> NEW POST
                    </Button>
                </div>

                {/* Social Feed Component */}
                <Feed />

                {/* New Post Modal */}
                <Modal 
                    isOpen={isPostModalOpen} 
                    onClose={() => setPostModalOpen(false)} 
                    title="CREATE NEW POST"
                >
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-black tracking-widest uppercase">POST CONTENT</label>
                            <textarea 
                                className="w-full h-40 border-3 border-black rounded-2xl p-6 font-bold text-sm outline-none focus:shadow-brutalist-sm transition-all bg-nile-white/50"
                                placeholder="What's happening? Share updates, jobs, or success stories..."
                            ></textarea>
                        </div>
                        
                        <InputField label="HASHTAGS" placeholder="#TECH #NILE #SUCCESS" />
                        
                        <div className="flex justify-end gap-3 pt-4">
                            <Button variant="outline" onClick={() => setPostModalOpen(false)}>CANCEL</Button>
                            <Button variant="primary" onClick={() => setPostModalOpen(false)}>POST UPDATE</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default StudentFeed;
