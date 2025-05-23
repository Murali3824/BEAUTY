import React from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, Wallet, HelpCircle, Settings, Star, DollarSign, Clock } from 'lucide-react';

const ProfessionalSidebar = ({
    user,
    averageRating = 4.8,
    activePage = 'dashboard'
}) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-pink-400">
                    {user?.name.charAt(0) || 'P'}
                </div>
                <h3 className="font-bold text-lg">{user?.name || 'Professional'}</h3>
                <p className="text-gray-500 text-sm">{user?.email || 'professional@example.com'}</p>
                <div className="mt-2 flex items-center justify-center">
                    <div className="flex text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm">{averageRating.toFixed(1)}</span>
                    </div>
                </div>
            </div>

            <nav className="space-y-1">
                <Link
                    to="/beautician-dashboard"
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === 'dashboard' ? 'text-pink-400 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    <User className="h-5 w-5 mr-3" />
                    Dashboard
                </Link>
                <Link
                    to="/beautician-dashboard/jobs"
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === 'jobs' ? 'text-pink-400 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    <Calendar className="h-5 w-5 mr-3" />
                    Jobs
                </Link>
                <Link
                    to="/beautician-dashboard/profile"
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === 'profile' ? 'text-pink-400 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    <User className="h-5 w-5 mr-3" />
                    Profile & Services
                </Link>
                <Link
                    to="/beautician-dashboard/schedule"
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === 'schedule' ? 'text-pink-400 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    <Clock className="h-5 w-5 mr-3" />
                    Schedule & Availability
                </Link>
                <Link
                    to="/beautician-dashboard/payments"
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === 'payments' ? 'text-pink-400 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    <DollarSign className="h-5 w-5 mr-3" />
                    Payment History
                </Link>
                <Link
                    to="/beautician-dashboard/earnings"
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === 'earnings' ? 'text-pink-400 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    <Wallet className="h-5 w-5 mr-3" />
                    Earnings & Withdrawals
                </Link>
                <Link
                    to="/beautician-dashboard/ratings"
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === 'ratings' ? 'text-pink-400 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    <Star className="h-5 w-5 mr-3" />
                    Ratings & Feedback
                </Link>
                <Link
                    to="/beautician-dashboard/settings"
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === 'settings' ? 'text-pink-400 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    <Settings className="h-5 w-5 mr-3" />
                    Account Settings
                </Link>
                <Link
                    to="/beautician-dashboard/support"
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === 'support' ? 'text-pink-400 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    <HelpCircle className="h-5 w-5 mr-3" />
                    Support
                </Link>
            </nav>
        </div>
    );
};

export default ProfessionalSidebar;