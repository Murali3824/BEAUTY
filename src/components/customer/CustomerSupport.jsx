import React, { useState } from 'react';
import { Mail, Phone, HelpCircle } from 'lucide-react';

const CustomerSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic (e.g., API call)
    alert('Support request submitted! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-6">
            <HelpCircle className="h-8 w-8 text-pink-400 mr-3" />
            <h2 className="text-xl font-bold font-serif">Support</h2>
          </div>
          <p className="text-gray-500 mb-6">
            We're here to help! Reach out with any questions or issues, or check our FAQs below.
          </p>

          {/* Contact Form */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  rows="4"
                  placeholder="How can we assist you?"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* FAQ Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">How do I update my availability?</h4>
                <p className="text-sm text-gray-600">
                  Go to the Schedule & Availability page, select a date, and add or remove time slots as needed. Your changes are saved automatically.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">How can I reset my password?</h4>
                <p className="text-sm text-gray-600">
                  Use the "Forgot Password" link on the login page to receive a reset link via email.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">Who can I contact for billing issues?</h4>
                <p className="text-sm text-gray-600">
                  Use the contact form above or reach out to our support team at support@example.com.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Other Ways to Reach Us</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-pink-400 mr-2" />
                <span className="text-gray-600">support@example.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-pink-400 mr-2" />
                <span className="text-gray-600">+1 (800) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;