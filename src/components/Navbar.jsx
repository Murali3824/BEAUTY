import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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

    // Handle navigation to routes
    const handleNavigation = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    // Determine if a nav item is active
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <span
                            onClick={() => handleNavigation('/')}
                            className="font-playfair font-bold text-3xl text-black cursor-pointer"
                        >
                            Beauty<span className="text-pink-400">luxe</span>
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => handleNavigation('/')}
                            className={`font-medium transition-colors ${
                                isActive('/') ? 'text-pink-400' : 'text-gray-700 hover:text-pink-400'
                            }`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => handleNavigation('/services')}
                            className={`font-medium transition-colors ${
                                isActive('/services') ? 'text-pink-400' : 'text-gray-700 hover:text-pink-400'
                            }`}
                        >
                            Services
                        </button>
                        <button
                            onClick={() => handleNavigation('/about')}
                            className={`font-medium transition-colors ${
                                isActive('/about') ? 'text-pink-400' : 'text-gray-700 hover:text-pink-400'
                            }`}
                        >
                            About Us
                        </button>
                        <button
                            onClick={() => handleNavigation('/gallery')}
                            className={`font-medium transition-colors ${
                                isActive('/gallery') ? 'text-pink-400' : 'text-gray-700 hover:text-pink-400'
                            }`}
                        >
                            Gallery
                        </button>
                        <button
                            onClick={() => handleNavigation('/contact')}
                            className={`font-medium transition-colors ${
                                isActive('/contact') ? 'text-pink-400' : 'text-gray-700 hover:text-pink-400'
                            }`}
                        >
                            Contact Us
                        </button>
                        <button
                            onClick={() => handleNavigation('/loginsignup')}
                            className={`font-medium py-3 px-6 rounded-md transition-all duration-300 shadow-sm ${
                                location.pathname === '/loginsignup'
                                    ? 'bg-pink-500 text-white'
                                    : 'bg-pink-200 hover:bg-opacity-90 text-black'
                            }`}
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Navigation button */}
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
                                onClick={() => handleNavigation('/')}
                                className={`font-medium py-2 border-b border-gray-100 ${
                                    isActive('/') ? 'text-pink-400' : 'text-gray-700 hover:text-pink-400'
                                }`}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => handleNavigation('/services')}
                                className={`font-medium py-2 border-b border-gray-100 ${
                                    isActive('/services') ? 'text-pink-400' : 'text-gray-700 hover:text-pink-400'
                                }`}
                            >
                                Services
                            </button>
                            <button
                                onClick={() => handleNavigation('/about')}
                                className={`font-medium py-2 border-b border-gray-100 ${
                                    isActive('/about') ? 'text-pink-400' : 'text-gray-700 hover:text-pink-400'
                                }`}
                            >
                                About Us
                            </button>
                            <button
                                onClick={() => handleNavigation('/gallery')}
                                className={`font-medium py-2 border-b border-gray-100 ${
                                    isActive('/gallery') ? 'text-pink-400' : 'text-gray-700 hover:text-pink-400'
                                }`}
                            >
                                Gallery
                            </button>
                            <button
                                onClick={() => handleNavigation('/contact')}
                                className={`font-medium py-2 border-b border-gray-100 ${
                                    isActive('/contact') ? 'text-pink-400' : 'text-gray-700 hover:text-pink-400'
                                }`}
                            >
                                Contact Us
                            </button>
                            <button
                                onClick={() => handleNavigation('/loginsignup')}
                                className={`w-full py-2 rounded-lg ${
                                    location.pathname === '/loginsignup'
                                        ? 'bg-pink-500 text-white'
                                        : 'bg-pink-200 hover:bg-opacity-90 text-black'
                                }`}
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;