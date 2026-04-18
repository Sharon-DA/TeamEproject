import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { MapPin, CalendarDays, Clock, Tag, ArrowRight, Users } from 'lucide-react';

const events = [
    {
        id: 1,
        title: 'Nile University Tech Summit 2024',
        organiser: 'NILE UNIVERSITY',
        category: 'TECH',
        date: 'Fri, 20 Dec 2024',
        time: '10:00 AM – 4:00 PM',
        location: 'Main Auditorium, Abuja',
        attendees: 342,
        registered: true,
        featured: true,
    },
    {
        id: 2,
        title: 'Resume Building & Career Prep Workshop',
        organiser: 'CAREER SERVICES',
        category: 'WORKSHOP',
        date: 'Fri, 13 Dec 2024',
        time: '11:00 AM – 1:00 PM',
        location: 'LT4 Engineering Block',
        attendees: 80,
        registered: false,
        featured: false,
    },
    {
        id: 3,
        title: 'Internship Fair — Connect with Top Employers',
        organiser: 'STUDENT AFFAIRS',
        category: 'FAIR',
        date: 'Sat, 21 Dec 2024',
        time: '9:00 AM – 3:00 PM',
        location: 'Sports Complex, Nile University',
        attendees: 520,
        registered: true,
        featured: false,
    },
    {
        id: 4,
        title: 'Webinar: Breaking Into Big Tech from Nigeria',
        organiser: 'TECH INNOVATIONS INC.',
        category: 'WEBINAR',
        date: 'Wed, 18 Dec 2024',
        time: '3:00 PM – 5:00 PM',
        location: 'Online (Zoom)',
        attendees: 200,
        registered: false,
        featured: false,
    },
];

const catColors: Record<string, string> = {
    TECH: 'bg-nile-blue text-white',
    WORKSHOP: 'bg-nile-green text-white',
    FAIR: 'bg-nile-green text-nile-white',
    WEBINAR: 'bg-nile-white text-black',
};

const filters = ['ALL', 'TECH', 'WORKSHOP', 'FAIR', 'WEBINAR'];

const EventsCalendar = () => {
    const [active, setActive] = useState('ALL');
    const filtered = active === 'ALL' ? events : events.filter(e => e.category === active);

    return (
        <DashboardLayout>
            <div className="p-10 space-y-10 font-sans bg-nile-white min-h-full">
                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-6xl font-black text-black leading-none uppercase">Events .</h2>
                        <p className="text-lg font-bold text-nile-blue/70 uppercase mt-2">Stay connected with your campus .</p>
                    </div>
                    <button className="bg-nile-green text-nile-white font-black py-4 px-10 rounded-full border-3 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase text-sm">
                        + SUGGEST EVENT
                    </button>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-4">
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => setActive(f)}
                            className={`px-6 py-2 rounded-full border-3 border-black font-black text-xs transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-brutalist-sm ${active === f ? 'bg-nile-green text-white' : 'bg-white text-black'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Featured Event */}
                {filtered.find(e => e.featured) && (
                    <div className="bg-nile-green text-nile-white p-10 rounded-[40px] border-3 border-black shadow-brutalist relative overflow-hidden">
                        <div className="absolute top-6 right-6 bg-nile-green text-white text-[10px] font-black px-4 py-1 rounded-full border-2 border-white uppercase">
                            FEATURED
                        </div>
                        <span className={`text-[9px] font-black px-3 py-1 rounded-full border-2 border-white/40 uppercase ${catColors[filtered.find(e => e.featured)!.category]}`}>
                            {filtered.find(e => e.featured)!.category}
                        </span>
                        <h3 className="text-4xl font-black mt-4 mb-6 leading-tight">{filtered.find(e => e.featured)!.title}</h3>
                        <div className="flex flex-wrap gap-8 text-sm font-bold text-nile-blue/70 mb-8">
                            <div className="flex items-center space-x-2"><CalendarDays size={16} strokeWidth={3} /><span className="uppercase">{filtered.find(e => e.featured)!.date}</span></div>
                            <div className="flex items-center space-x-2"><Clock size={16} strokeWidth={3} /><span className="uppercase">{filtered.find(e => e.featured)!.time}</span></div>
                            <div className="flex items-center space-x-2"><MapPin size={16} strokeWidth={3} /><span className="uppercase">{filtered.find(e => e.featured)!.location}</span></div>
                            <div className="flex items-center space-x-2"><Users size={16} strokeWidth={3} /><span className="uppercase">{filtered.find(e => e.featured)!.attendees} ATTENDING</span></div>
                        </div>
                        <button className="bg-white text-black font-black py-4 px-10 rounded-full border-3 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.4)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase flex items-center space-x-3">
                            <span>REGISTERED</span>
                            <ArrowRight size={18} strokeWidth={3} />
                        </button>
                    </div>
                )}

                {/* Events Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {filtered.filter(e => !e.featured).map(ev => (
                        <EventCard key={ev.id} event={ev} />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

const EventCard = ({ event }: { event: typeof events[0] }) => (
    <div className="bg-white p-8 rounded-[40px] border-3 border-black shadow-brutalist hover:-translate-y-1 transition-all group">
        <div className="flex justify-between items-start mb-6">
            <span className={`text-[9px] font-black px-3 py-1 rounded-full border-2 border-black uppercase ${catColors[event.category]}`}>
                {event.category}
            </span>
            <span className="text-[9px] font-black text-nile-blue/70 uppercase">{event.organiser}</span>
        </div>

        <h3 className="text-xl font-black text-black uppercase mb-6 leading-tight">{event.title}</h3>

        <div className="space-y-3 mb-8">
            <div className="flex items-center space-x-3 text-sm font-bold text-nile-blue">
                <CalendarDays size={16} strokeWidth={3} />
                <span className="uppercase">{event.date} • {event.time}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm font-bold text-nile-blue">
                <MapPin size={16} strokeWidth={3} />
                <span className="uppercase">{event.location}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm font-bold text-nile-blue">
                <Users size={16} strokeWidth={3} />
                <span className="uppercase">{event.attendees} ATTENDING</span>
            </div>
        </div>

        <button className={`w-full font-black py-4 rounded-full border-3 border-black shadow-brutalist-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase text-sm ${event.registered ? 'bg-nile-green text-white' : 'bg-white text-black'}`}>
            {event.registered ? '✓ REGISTERED' : 'REGISTER NOW'}
        </button>
    </div>
);

export default EventsCalendar;
