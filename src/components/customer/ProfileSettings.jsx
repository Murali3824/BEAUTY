import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const ProfileSettings = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')) || {
        name: 'User',
        email: 'user@example.com',
        phone: '',
    };

    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const validateForm = () => {
        if (!formData.name) {
            setError('Name is required');
            return false;
        }
        if (!formData.email.includes('@') || formData.email.length < 5) {
            setError('Please enter a valid email address');
            return false;
        }
        if (formData.phone && (formData.phone.length < 10 || !/^\d+$/.test(formData.phone))) {
            setError('Please enter a valid phone number (at least 10 digits)');
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        localStorage.setItem('user', JSON.stringify(formData));
        setSuccess('Profile updated successfully!');
        setError('');
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-3xl font-playfair font-medium text-gray-800 mb-6">Profile Settings</h1>
            <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-fuchsia-500/20 flex items-center justify-center text-2xl font-bold text-fuchsia-500">
                    {formData.name.charAt(0)}
                </div>
            </div>
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm text-gray-600 font-lato mb-1">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-fuchsia-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 font-lato"
                        placeholder="Your Name"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm text-gray-600 font-lato mb-1">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-fuchsia-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 font-lato"
                        placeholder="your.email@example.com"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm text-gray-600 font-lato mb-1">Phone Number (Optional)</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-fuchsia-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 font-lato"
                        placeholder="1234567890"
                    />
                </div>
                {error && <p className="text-red-500 text-sm font-lato text-center">{error}</p>}
                {success && <p className="text-green-500 text-sm font-lato text-center">{success}</p>}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-fuchsia-500 text-white font-lato font-medium py-3 rounded-lg hover:bg-fuchsia-600 transition-all duration-300"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default ProfileSettings;