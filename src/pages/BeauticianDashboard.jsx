import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Wallet, User, Star, HelpCircle } from 'lucide-react';
import ProfessionalSidebar from '../components/professional/ProfessionalSidebar';

const BeauticianDashboard = () => {
    const [activeTab, setActiveTab] = useState('new');
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Determine if we should render the main dashboard or the nested route
    const isDashboardHome = location.pathname === '/beautician-dashboard';
    
    // Determine active page for sidebar highlighting
    const activePage = location.pathname === '/beautician-dashboard' ? 'dashboard' :
        location.pathname.split('/').pop();

    // Load user data from localStorage
    const user = {
        name: localStorage.getItem('name') || 'Professional',
        email: localStorage.getItem('email') || 'professional@example.com'
    };

    useEffect(() => {
        // Load jobs from localStorage or initialize mock data
        let storedJobs = JSON.parse(localStorage.getItem('jobs'));
        if (!storedJobs) {
            storedJobs = [
                { id: 1, service: 'Haircut', date: '2025-05-25', time: '10:00 AM', status: 'new', customer: 'Alice Brown', price: 30 },
                { id: 2, service: 'Massage', date: '2025-05-20', time: '2:00 PM', status: 'completed', customer: 'Bob Smith', price: 50, rating: 4.5 },
            ];
            localStorage.setItem('jobs', JSON.stringify(storedJobs));
        }
        setJobs(storedJobs);
    }, []);

    const handleJobAction = (id, action) => {
        let updatedJobs;
        if (action === 'accept') {
            updatedJobs = jobs.map(job =>
                job.id === id ? { ...job, status: 'ongoing' } : job
            );
        } else if (action === 'reject') {
            updatedJobs = jobs.map(job =>
                job.id === id ? { ...job, status: 'canceled' } : job
            );
        } else {
            updatedJobs = jobs.map(job =>
                job.id === id ? { ...job, status: 'completed' } : job
            );
        }
        setJobs(updatedJobs);
        localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    };

    const filteredJobs = jobs.filter(job => job.status === activeTab);
    const totalJobs = jobs.filter(job => job.status === 'ongoing').length;
    const totalEarnings = jobs.filter(job => job.status === 'completed').reduce((sum, job) => sum + job.price, 0);
    const averageRating = jobs.filter(job => job.rating).length > 0
        ? jobs.filter(job => job.rating).reduce((sum, job) => sum + (job.rating || 0), 0) / jobs.filter(job => job.rating).length
        : 4.8;

    return (
        <div className="bg-gray-50 min-h-screen pt-16">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar Navigation - Keep this on the left side */}
                    <div className="md:w-1/4">
                        <ProfessionalSidebar
                            user={user}
                            averageRating={averageRating}
                            activePage={activePage}
                        />
                    </div>

                    {/* Main Content Area - Right side */}
                    <div className="md:w-3/4">
                        {isDashboardHome ? (
                            <>
                                {/* Dashboard Overview */}
                                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                                    <h2 className="text-xl font-bold font-serif mb-6">Dashboard Overview</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold text-gray-500 mb-1">Today's Jobs</h3>
                                            <p className="text-3xl font-bold">{totalJobs}</p>
                                            <div className="mt-2 text-sm text-gray-500">
                                                {jobs.filter(j => j.status === 'ongoing').length > 0
                                                    ? `Next: ${jobs.filter(j => j.status === 'ongoing')[0].time} - ${jobs.filter(j => j.status === 'ongoing')[0].service}`
                                                    : 'No jobs scheduled for today'}
                                            </div>
                                        </div>
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold text-gray-500 mb-1">Total Earnings</h3>
                                            <p className="text-3xl font-bold text-green-500">${totalEarnings}</p>
                                            <div className="mt-2 text-sm text-gray-500">This month</div>
                                        </div>
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold text-gray-500 mb-1">Service Rating</h3>
                                            <div className="flex items-center">
                                                <p className="text-3xl font-bold mr-2">{averageRating.toFixed(1)}</p>
                                                <div className="flex text-yellow-500">
                                                    <Star className="h-5 w-5 fill-current" />
                                                </div>
                                            </div>
                                            <div className="mt-2 text-sm text-gray-500">Based on {jobs.filter(job => job.rating).length} reviews</div>
                                        </div>
                                    </div>
                                    <h3 className="font-semibold mb-3">Quick Actions</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <button className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition duration-300">
                                            View Today's Schedule
                                        </button>
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300">
                                            Update Availability
                                        </button>
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300">
                                            Withdraw Earnings
                                        </button>
                                    </div>
                                </div>

                                {/* Job Management */}
                                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                                    <h2 className="text-xl font-bold font-serif mb-6">Job Management</h2>
                                    <div className="border-b border-gray-200 mb-6">
                                        <nav className="flex space-x-8">
                                            <button
                                                onClick={() => setActiveTab('new')}
                                                className={`border-b-2 ${activeTab === 'new' ? 'border-pink-400 text-pink-400' : 'border-transparent text-gray-500'} px-1 py-4 font-medium`}
                                            >
                                                New Requests ({jobs.filter(job => job.status === 'new').length})
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('ongoing')}
                                                className={`border-b-2 ${activeTab === 'ongoing' ? 'border-pink-400 text-pink-400' : 'border-transparent text-gray-500'} px-1 py-4 font-medium hover:text-gray-700`}
                                            >
                                                Ongoing ({jobs.filter(job => job.status === 'ongoing').length})
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('completed')}
                                                className={`border-b-2 ${activeTab === 'completed' ? 'border-pink-400 text-pink-400' : 'border-transparent text-gray-500'} px-1 py-4 font-medium hover:text-gray-700`}
                                            >
                                                Completed
                                            </button>
                                        </nav>
                                    </div>
                                    <div className="space-y-4">
                                        {filteredJobs.length > 0 ? (
                                            filteredJobs.map(job => (
                                                <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900">{job.service}</h4>
                                                            <p className="text-sm text-gray-500">Customer: {job.customer}</p>
                                                            <p className="text-sm text-gray-500">{job.date} at {job.time}</p>
                                                            <p className="text-sm text-gray-500">Price: ${job.price}</p>
                                                            {job.rating && (
                                                                <div className="flex items-center mt-1">
                                                                    <span className="text-sm text-gray-500 mr-1">Rating:</span>
                                                                    {[...Array(Math.floor(job.rating))].map((_, i) => (
                                                                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="space-x-2">
                                                            {job.status === 'new' && (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleJobAction(job.id, 'accept')}
                                                                        className="text-pink-400 hover:underline"
                                                                    >
                                                                        Accept
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleJobAction(job.id, 'reject')}
                                                                        className="text-red-500 hover:underline"
                                                                    >
                                                                        Reject
                                                                    </button>
                                                                </>
                                                            )}
                                                            {job.status === 'ongoing' && (
                                                                <button
                                                                    onClick={() => handleJobAction(job.id, 'complete')}
                                                                    className="text-pink-400 hover:underline"
                                                                >
                                                                    Mark Complete
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8">
                                                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500">No {activeTab} jobs found</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Ratings & Reviews */}
                                <div className="bg-white rounded-xl shadow-md p-6">
                                    <h2 className="text-xl font-bold font-serif mb-6">Your Recent Ratings</h2>
                                    <div className="space-y-6">
                                        {jobs.filter(job => job.rating).length > 0 ? (
                                            jobs.filter(job => job.rating).slice(0, 2).map(job => (
                                                <div key={job.id} className="border-b border-gray-200 pb-6">
                                                    <div className="flex justify-between mb-2">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                                                            <div>
                                                                <h4 className="font-semibold">{job.customer}</h4>
                                                                <div className="flex text-yellow-500">
                                                                    {[...Array(Math.floor(job.rating || 0))].map((_, i) => (
                                                                        <Star key={i} className="h-4 w-4 fill-current" />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-gray-500">{job.date}</div>
                                                    </div>
                                                    <p className="text-gray-700">"Excellent service! Very professional and did an amazing job."</p>
                                                    <div className="mt-2 text-sm text-gray-500">Service: {job.service}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8">
                                                <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500">No ratings yet</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            // This is where the nested route components will render when 
                            // navigating to a specific sidebar item
                            <Outlet />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeauticianDashboard;
