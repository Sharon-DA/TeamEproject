import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PageTransition from './components/PageTransition';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';

// Public & Auth Pages
import Onboarding from './pages/student/Onboarding';
import Login from './pages/student/Login';
import Register from './pages/student/Register';
import JoinAs from './pages/student/JoinAs';

// Employer Registration
import EmployerRegistration from './pages/employer/Registration';
import AwaitingVerification from './pages/employer/AwaitingVerification';

// Layout Wrappers
import StaffLayout from './layouts/StaffLayout';
import EmployerLayout from './layouts/EmployerLayout';

// Student Section
import StudentStatus from './pages/student/StudentStatus';
import AlumniLogin from './pages/student/AlumniLogin';
import StudentPortal from './pages/student/StudentPortal';
import ProfileCompletion from './pages/student/ProfileCompletion';
import StudentDashboard from './pages/student/StudentDashboard';
import FeedStudent from './pages/student/Feed';
import JobBoardStudent from './pages/student/JobBoard';
import JobDetailStudent from './pages/student/JobDetail';
import CareerCenter from './pages/student/CareerCenter';
import ApplicationTracker from './pages/student/ApplicationTracker';
import EventsCalendar from './pages/student/EventsCalendar';
import ProfileStudent from './pages/student/Profile';
import Network from './pages/student/Network';
import Messages from './pages/student/Messages';
import EditProfileStudent from './pages/student/EditProfile';
import AICounselor from './pages/student/AICounselor';

// Staff Section
import StaffDashboard from './pages/staff/Dashboard';
import StaffApplications from './pages/staff/Applications';
import StaffEvents from './pages/staff/Events';
import StaffJobs from './pages/staff/Jobs';
import StaffServices from './pages/staff/Services';
import StaffProfile from './pages/staff/Profile';
import StaffMessages from './pages/staff/Messages';

// Employer Section
import EmployerDashboard from './pages/employer/Dashboard';
import EmployerCandidates from './pages/employer/Candidates';
import EmployerCandidateDetail from './pages/employer/CandidateDetail';
import EmployerJobs from './pages/employer/Jobs';
import EmployerApplications from './pages/employer/Applications';
import FeedEmployer from './pages/employer/Feed';
import EmployerEvents from './pages/employer/Events';
import EmployerProfile from './pages/employer/Profile';
import EmployerMessages from './pages/employer/Messages';

// Helper: wraps elements with page transition
const T = ({ children }: { children: React.ReactNode }) => (
    <PageTransition>{children}</PageTransition>
);

const App = () => {
    return (
        <ToastProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        {/* --- PUBLIC & ENTRY ROUTES --- */}
                        <Route path="/" element={<Navigate to="/onboarding" replace />} />
                        <Route path="/onboarding" element={<T><Onboarding /></T>} />
                        <Route path="/login" element={<T><Login /></T>} />
                        <Route path="/register" element={<T><Register /></T>} />
                        <Route path="/join-as" element={<T><JoinAs /></T>} />

                        {/* --- EMPLOYER AUTH FLOW --- */}
                        <Route path="/employer-registration" element={<EmployerRegistration />} />
                        <Route path="/awaiting-verification" element={<AwaitingVerification />} />

                        {/* --- STUDENT ENTRY FLOW --- */}
                        <Route path="/student-status" element={<T><StudentStatus /></T>} />
                        <Route path="/alumni-login" element={<T><AlumniLogin /></T>} />
                        <Route path="/student-portal" element={<T><StudentPortal /></T>} />
                        <Route path="/profile-completion" element={<T><ProfileCompletion /></T>} />

                        {/* --- NESTED STUDENT ROUTES --- */}
                        <Route path="/student">
                            <Route index element={<StudentDashboard />} />
                            <Route path="feed" element={<FeedStudent />} />
                            <Route path="jobs" element={<JobBoardStudent />} />
                            <Route path="jobs/:id" element={<JobDetailStudent />} />
                            <Route path="career" element={<CareerCenter />} />
                            <Route path="career/ai" element={<AICounselor />} />
                            <Route path="applications" element={<ApplicationTracker />} />
                            <Route path="events" element={<EventsCalendar />} />
                            <Route path="profile" element={<ProfileStudent />} />
                            <Route path="profile/edit" element={<EditProfileStudent />} />
                            <Route path="network" element={<Network />} />
                            <Route path="messages" element={<Messages />} />
                        </Route>

                        {/* --- NESTED STAFF ROUTES --- */}
                        <Route path="/staff" element={<StaffLayout />}>
                            <Route index element={<StaffDashboard />} />
                            <Route path="applications" element={<StaffApplications />} />
                            <Route path="events" element={<StaffEvents />} />
                            <Route path="jobs" element={<StaffJobs />} />
                            <Route path="services" element={<StaffServices />} />
                            <Route path="profile" element={<StaffProfile />} />
                            <Route path="messages" element={<StaffMessages />} />
                        </Route>

                        {/* --- NESTED EMPLOYER ROUTES --- */}
                        <Route path="/employer" element={<EmployerLayout />}>
                            <Route index element={<EmployerDashboard />} />
                            <Route path="candidates" element={<EmployerCandidates />} />
                            <Route path="candidates/:id" element={<EmployerCandidateDetail />} />
                            <Route path="jobs" element={<EmployerJobs />} />
                            <Route path="applications" element={<EmployerApplications />} />
                            <Route path="feed" element={<FeedEmployer />} />
                            <Route path="events" element={<EmployerEvents />} />
                            <Route path="profile" element={<EmployerProfile />} />
                            <Route path="messages" element={<EmployerMessages />} />
                        </Route>

                        {/* --- FALLBACK --- */}
                        <Route path="*" element={<Navigate to="/onboarding" replace />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ToastProvider>
    );
};

export default App;