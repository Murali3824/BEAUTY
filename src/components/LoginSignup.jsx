import React, { useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function LoginSignup() {
    const [mode, setMode] = React.useState('login'); // login or signup
    const [userType, setUserType] = React.useState('customer'); // customer or professional
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        portfolio: ''
    });
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const validateForm = () => {
        if (!formData.email.includes('@') || formData.email.length < 5) {
            setError('Please enter a valid email address');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        if (mode === 'signup') {
            if (!formData.name) {
                setError('Name is required for signup');
                return false;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return false;
            }
            if (userType === 'professional' && !formData.portfolio) {
                setError('Portfolio URL is required for professionals');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;
        console.log(`${mode} submitted:`, { userType, ...formData });
        // alert(`${mode.charAt(0).toUpperCase() + mode.slice(1)} successful! Redirecting to dashboard...`);
        navigate('/')
        setFormData({ name: '', email: '', password: '', confirmPassword: '', portfolio: '' });
        setError('');
    };

    const handleSocialLogin = (provider) => {
        console.log(`Social ${mode} with ${provider}`);
        // alert(`Redirecting to ${provider} ${mode}...`);
        navigate('/')

    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="min-h-screen py-24 flex items-center justify-center bg-gradient-to-br from-beautyluxe-pink to-beautyluxe-gray px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 animate-fade-in">
                <h1 className="text-3xl font-playfair font-bold text-black text-center mb-6">
                    {mode === 'login' ? 'Welcome Back to' : 'Join'}
                    <span className="font-playfair font-bold text-3xl pl-2 text-black">
                        Beauty<span className="text-pink-400">luxe</span>
                    </span>
                </h1>
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setMode('login')}
                        className={`px-4 py-2 text-sm font-medium ${mode === 'login' ? 'text-gold border-b-2 border-gold' : 'text-gray-500 hover:text-charcoal'} transition-colors duration-300`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setMode('signup')}
                        className={`px-4 py-2 text-sm font-medium ${mode === 'signup' ? 'text-gold border-b-2 border-gold' : 'text-gray-500 hover:text-charcoal'} transition-colors duration-300`}
                    >
                        Signup
                    </button>
                </div>
                {mode === 'signup' && (
                    <div className="flex justify-center mb-6 animate-slide-up">
                        <button
                            onClick={() => setUserType('customer')}
                            className={`px-4 py-2 text-sm font-medium ${userType === 'customer' ? 'bg-beautyluxe-pink text-charcoal rounded-lg' : 'text-gray-500 hover:text-charcoal'} transition-colors duration-300`}
                        >
                            Customer
                        </button>
                        <button
                            onClick={() => setUserType('professional')}
                            className={`px-4 py-2 text-sm font-medium ${userType === 'professional' ? 'bg-beautyluxe-pink text-charcoal rounded-lg' : 'text-gray-500 hover:text-charcoal'} transition-colors duration-300`}
                        >
                            Professional
                        </button>
                    </div>
                )}
                <div className="space-y-4 animate-slide-up">
                    {mode === 'signup' && (
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className="w-full px-4 py-3 border border-beautyluxe-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-beautyluxe-pink"
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        className="w-full px-4 py-3 border border-beautyluxe-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-beautyluxe-pink"
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className="w-full px-4 py-3 border border-beautyluxe-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-beautyluxe-pink"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-beautyluxe-pink"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {mode === 'signup' && (
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm Password"
                                className="w-full px-4 py-3 border border-beautyluxe-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-beautyluxe-pink"
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-beautyluxe-pink"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    )}
                    {mode === 'signup' && userType === 'professional' && (
                        <input
                            type="text"
                            name="portfolio"
                            value={formData.portfolio}
                            onChange={handleInputChange}
                            placeholder="Portfolio URL (e.g., Instagram, website)"
                            className="w-full px-4 py-3 border border-beautyluxe-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-beautyluxe-pink"
                        />
                    )}
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-beautyluxe-pink text-charcoal font-medium py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md"
                    >
                        {mode === 'login' ? 'Login' : 'Signup'}
                    </button>
                </div>
                <div className="my-6 flex items-center justify-center">
                    <div className="border-t border-gray-200 flex-grow"></div>
                    <span className="px-3 text-gray-500 text-sm">or {mode === 'login' ? 'login' : 'signup'} with</span>
                    <div className="border-t border-gray-200 flex-grow"></div>
                </div>
                <div className="space-y-3 animate-slide-up">
                    <button
                        onClick={() => handleSocialLogin('Google')}
                        className="w-full flex items-center justify-center bg-white border border-blush-pink/50 text-charcoal font-medium py-3 px-6 rounded-lg hover:bg-blush-pink/20 transition-all duration-300"
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#DB4437" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c2.21 0 4.21.89 5.65 2.34L15.5 8.5c-.76-.76-1.82-1.23-2.95-1.23-2.76 0-5 2.24-5 5s2.24 5 5 5c2.35 0 4.34-1.62 4.84-3.84h-4.84v-2h8.34c.17 1.09.26 2.21.26 3.34 0 4.41-3.59 8-8 8z" />
                        </svg>
                        {mode === 'login' ? 'Login' : 'Signup'} with Google
                    </button>
                    <button
                        onClick={() => handleSocialLogin('Facebook')}
                        className="w-full flex items-center justify-center bg-white border border-blush-pink/50 text-charcoal font-medium py-3 px-6 rounded-lg hover:bg-blush-pink/20 transition-all duration-300"
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#4267B2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.41h-2.24v4.59H9.24v-4.59H7v-2.82h2.24V9.41c0-2.24 1.36-3.47 3.34-3.47 1.03 0 1.91.08 2.16.11v2.5h-1.48c-1.16 0-1.38.55-1.38 1.36v1.79H17v2.82z" />
                        </svg>
                        {mode === 'login' ? 'Login' : 'Signup'} with Facebook
                    </button>
                </div>
                <p className="text-center text-gray-500 text-sm mt-6">
                    {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                    <button
                        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                        className="text-gold hover:underline ml-1"
                    >
                        {mode === 'login' ? 'Signup' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default LoginSignup;