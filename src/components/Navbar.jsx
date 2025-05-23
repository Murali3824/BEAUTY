import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = !!localStorage.getItem('token');
    const userType = localStorage.getItem('userType');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('phone');
        navigate('/loginsignup');
        setIsMenuOpen(false);
    };

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    const getHomePath = () => {
        if (isLoggedIn) {
            return userType === 'customer' ? '/customer-dashboard' : '/beautician-dashboard';
        }
        return '/';
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div onClick={() => handleNavigation(getHomePath())} className="flex items-center">
                        <span className="font-playfair font-bold text-3xl text-black cursor-pointer">
                            Beauty<span className="text-fuchsia-500">luxe</span>
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => handleNavigation(getHomePath())}
                            className={`font-lato font-medium transition-colors ${
                                isActive(getHomePath()) ? 'text-fuchsia-500' : 'text-gray-700 hover:text-fuchsia-500'
                            }`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => handleNavigation('/services')}
                            className={`font-lato font-medium transition-colors ${
                                isActive('/services') ? 'text-fuchsia-500' : 'text-gray-700 hover:text-fuchsia-500'
                            }`}
                        >
                            Services
                        </button>
                        <button
                            onClick={() => handleNavigation('/about')}
                            className={`font-lato font-medium transition-colors ${
                                isActive('/about') ? 'text-fuchsia-500' : 'text-gray-700 hover:text-fuchsia-500'
                            }`}
                        >
                            About Us
                        </button>
                        <button
                            onClick={() => handleNavigation('/gallery')}
                            className={`font-lato font-medium transition-colors ${
                                isActive('/gallery') ? 'text-fuchsia-500' : 'text-gray-700 hover:text-fuchsia-500'
                            }`}
                        >
                            Gallery
                        </button>
                        <button
                            onClick={() => handleNavigation('/contact')}
                            className={`font-lato font-medium transition-colors ${
                                isActive('/contact') ? 'text-fuchsia-500' : 'text-gray-700 hover:text-fuchsia-500'
                            }`}
                        >
                            Contact Us
                        </button>
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="font-lato font-medium py-2 px-6 rounded-md bg-fuchsia-500 text-white hover:bg-fuchsia-600 transition-all duration-300 shadow-sm"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => handleNavigation('/loginsignup')}
                                className={`font-lato font-medium py-2 px-6 rounded-md transition-all duration-300 shadow-sm ${
                                    location.pathname === '/loginsignup'
                                        ? 'bg-fuchsia-500 text-white'
                                        : 'bg-fuchsia-200 hover:bg-fuchsia-300 text-black'
                                }`}
                            >
                                Get Started
                            </button>
                        )}
                    </div>

                    {/* Mobile Navigation Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-gray-700">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg animate-fade-in">
                        <div className="flex flex-col space-y-4 px-4">
                            <button
                                onClick={() => handleNavigation(getHomePath())}
                                className={`font-lato font-medium py-2 border-b border-gray-100 ${
                                    isActive(getHomePath()) ? 'text-fuchsia-500' : 'text-gray-700 hover:text-fuchsia-500'
                                }`}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => handleNavigation('/services')}
                                className={`font-lato font-medium py-2 border-b border-gray-100 ${
                                    isActive('/services') ? 'text-fuchsia-500' : 'text-gray-700 hover:text-fuchsia-500'
                                }`}
                            >
                                Services
                            </button>
                            <button
                                onClick={() => handleNavigation('/about')}
                                className={`font-lato font-medium py-2 border-b border-gray-100 ${
                                    isActive('/about') ? 'text-fuchsia-500' : 'text-gray-700 hover:text-fuchsia-500'
                                }`}
                            >
                                About Us
                            </button>
                            <button
                                onClick={() => handleNavigation('/gallery')}
                                className={`font-lato font-medium py-2 border-b border-gray-100 ${
                                    isActive('/gallery') ? 'text-fuchsia-500' : 'text-gray-700 hover:text-fuchsia-500'
                                }`}
                            >
                                Gallery
                            </button>
                            <button
                                onClick={() => handleNavigation('/contact')}
                                className={`font-lato font-medium py-2 border-b border-gray-100 ${
                                    isActive('/contact') ? 'text-fuchsia-500' : 'text-gray-700 hover:text-fuchsia-500'
                                }`}
                            >
                                Contact Us
                            </button>
                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="w-full py-2 rounded-lg bg-fuchsia-500 text-white hover:bg-fuchsia-600 font-lato font-medium"
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleNavigation('/loginsignup')}
                                    className={`w-full py-2 rounded-lg font-lato font-medium ${
                                        location.pathname === '/loginsignup'
                                            ? 'bg-fuchsia-500 text-white'
                                            : 'bg-fuchsia-200 hover:bg-fuchsia-300 text-black'
                                    }`}
                                >
                                    Get Started
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;