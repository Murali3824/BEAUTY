import React, { useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function LoginSignup() {
    const [mode, setMode] = React.useState('login'); // login or signup
    const [userType, setUserType] = React.useState('customer'); // customer or professional
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        password: '',
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
            if (!formData.phone || formData.phone.length < 10 || !/^\d+$/.test(formData.phone)) {
                setError('Please enter a valid phone number (at least 10 digits)');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        // Simulate token generation (in a real app, this would come from a backend)
        const token = `token_${formData.email}_${Date.now()}`;
        const userData = {
            token,
            userType: mode === 'signup' ? userType : localStorage.getItem('userType') || userType,
            email: formData.email,
            name: formData.name || localStorage.getItem('name') || '',
            phone: formData.phone || localStorage.getItem('phone') || '',
        };

        // Store user data and token in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userType', userData.userType);
        localStorage.setItem('email', userData.email);
        if (mode === 'signup') {
            localStorage.setItem('name', userData.name);
            localStorage.setItem('phone', userData.phone);
        }

        console.log(`${mode} submitted:`, userData);

        // Redirect to respective dashboard
        const redirectPath = userData.userType === 'customer' ? '/customer-dashboard' : '/beautician-dashboard';
        navigate(redirectPath);
        setFormData({ name: '', email: '', phone: '', password: '' });
        setError('');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                <div className="space-y-4 animate-slide-up">
                    {mode === 'signup' && (
                        <>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Full Name"
                                className="w-full px-4 py-3 border border-beautyluxe-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-beautyluxe-pink"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email Address"
                                className="w-full px-4 py-3 border border-beautyluxe-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-beautyluxe-pink"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Phone Number"
                                className="w-full px-4 py-3 border border-beautyluxe-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-beautyluxe-pink"
                            />
                        </>
                    )}
                    {mode === 'login' && (
                        <>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email Address"
                                className="w-full px-4 py-3 border border-beautyluxe-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-beautyluxe-pink"
                            />
                        </>
                    )}
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
                        <div>
                            <select
                                name="userType"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                className="w-full px-4 py-3 border border-beautyluxe-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-beautyluxe-pink bg-white"
                            >
                                <option value="customer">Customer</option>
                                <option value="professional">Beautician</option>
                            </select>
                        </div>
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