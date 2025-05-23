import React from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, Wallet, HelpCircle, Settings, Bell, Heart } from 'lucide-react';

const CustomerSidebar = ({ user, activePage = 'dashboard' }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-pink-400">
                    {user?.name?.charAt(0) || localStorage.getItem('name')?.charAt(0) || 'U'}
                </div>
                <h3 className="font-bold text-lg">{user?.name || localStorage.getItem('name') || 'User'}</h3>
                <p className="text-gray-500 text-sm">{user?.email || localStorage.getItem('email') || 'user@example.com'}</p>
            </div>

            <nav className="space-y-1">
                <Link
                    to="/customer-dashboard"
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === 'dashboard' ? 'text-pink-400 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    <User className="h-5 w-5 mr-3" />
                    Dashboard
                </Link>
                <Link
                    to="/customer-dashboard/bookings"
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === 'bookings' ? 'text-pink-400 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    <Calendar className="h-5 w-5 mr-3" />
                    My Bookings
                </Link>
                <Link
                    to="/customer-dashboard/favorites"
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === 'favorites' ? 'text-pink-400 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    <Heart className="h-5 w-5 mr-3" />
                    Favorites
                </Link>
                <Link
                    to="/customer-dashboard/notifications"
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === 'notifications' ? 'text-pink-400 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    <Bell className="h-5 w-5 mr-3" />
                    Notifications
                </Link>
                <Link
                    to="/customer-dashboard/profile"
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === 'profile' ? 'text-pink-400 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    <Settings className="h-5 w-5 mr-3" />
                    Profile Settings
                </Link>
                <Link
                    to="/customer-dashboard/wallet"
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === 'wallet' ? 'text-pink-400 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    <Wallet className="h-5 w-5 mr-3" />
                    Wallet & Payments
                </Link>
                <Link
                    to="/customer-dashboard/support"
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === 'support' ? 'text-pink-400 bg-pink-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                    <HelpCircle className="h-5 w-5 mr-3" />
                    Support
                </Link>
            </nav>
        </div>
    );
};

export default CustomerSidebar;
