import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import LoginSignup from './components/LoginSignup';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceCategory from './components/ServiceCategory';
import Gallery from './pages/Gallery';
import About from './pages/About';
import BookTreatment from './components/BookTreatment';
import CustomerDashboard from './pages/CustomerDashboard';
import BeauticianDashboard from './pages/BeauticianDashboard';
import MyBookings from './components/customer/MyBookings';
import ProfileSettings from './components/customer/ProfileSettings';
import WalletPayments from './components/customer/WalletPayments';
import CustomerSupport from './components/customer/CustomerSupport';
import Favorites from './components/customer/Favorites';
import Notification from './components/customer/Notifications';
import Jobs from './components/professional/Jobs';
import ProfileServices from './components/professional/ProfileServices';
import ScheduleAvailability from './components/professional/ScheduleAvailability';
import PaymentHistory from './components/professional/PaymentHistory';
import EarningsWithdrawals from './components/professional/EarningsWithdrawals';
import RatingsFeedback from './components/professional/RatingsFeedback';
import AccountSettings from './components/professional/AccountSettings';
import Support from './components/professional/Support';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('token');
    return isLoggedIn ? children : <Navigate to="/loginsignup" />;
};

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
    const userType = localStorage.getItem('userType');

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 800);

        // Redirect to dashboard if logged in and trying to access home
        if (isLoggedIn && location.pathname === '/') {
            const redirectPath = userType === 'customer' ? '/customer-dashboard' : '/beautician-dashboard';
            navigate(redirectPath);
        }
    }, [isLoggedIn, userType, location.pathname, navigate]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                        <div className="absolute inset-0 bg-fuchsia-200 rounded-full opacity-30 animate-ping"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-playfair font-bold text-3xl text-black">
                                Beauty<span className="text-pink-400">luxe</span>
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-600">Loading amazing beauty experiences...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 overflow-hidden">
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 bg-fuchsia-500 text-white p-3 rounded-full shadow-lg z-40 hover:bg-fuchsia-600 transition-all duration-300 opacity-80 hover:opacity-100"
                aria-label="Back to top"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
            </button>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            userType === 'customer' ? (
                                <CustomerDashboard />
                            ) : (
                                <BeauticianDashboard />
                            )
                        ) : (
                            <Home />
                        )
                    }
                />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:category" element={<ServiceCategory />} />
                <Route path="/about" element={<About />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/loginsignup" element={<LoginSignup />} />
                <Route path="/book/:category/:treatment" element={<BookTreatment />} />
                <Route
                    path="/customer-dashboard"
                    element={
                        <ProtectedRoute>
                            <CustomerDashboard />
                        </ProtectedRoute>
                    }
                >
                    <Route path="bookings" element={<MyBookings />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="notifications" element={<Notification />} />
                    <Route path="profile" element={<ProfileSettings />} />
                    <Route path="wallet" element={<WalletPayments />} />
                    <Route path="support" element={<CustomerSupport />} />
                </Route>


                <Route
                    path="/beautician-dashboard"
                    element={
                        <ProtectedRoute>
                            <BeauticianDashboard />
                        </ProtectedRoute>
                    }
                >
                    <Route path="jobs" element={<Jobs />} />
                    <Route path="profile" element={<ProfileServices />} />
                    <Route path="schedule" element={<ScheduleAvailability />} />
                    <Route path="payments" element={<PaymentHistory />} />
                    <Route path="earnings" element={<EarningsWithdrawals />} />
                    <Route path="ratings" element={<RatingsFeedback />} />
                    <Route path="settings" element={<AccountSettings />} />
                    <Route path="support" element={<Support />} />
                </Route>
            </Routes>
            <Footer />
        </div>
    );
};

export default App;