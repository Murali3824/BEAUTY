import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Search, Calendar, Wallet, Bell } from 'lucide-react';
import CustomerSidebar from '../components/customer/CustomerSidebar';
import serviceDetails from '../data/serviceDetails';

const CustomerDashboard = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const activePage = location.pathname === '/customer-dashboard' ? 'dashboard' :
        location.pathname.split('/').pop();

    // Construct user object from localStorage for the sidebar
    const user = {
        name: localStorage.getItem('name') || 'User',
        email: localStorage.getItem('email') || 'user@example.com'
    };

    const loadBookings = () => {
        const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
        setBookings(storedBookings);
    };

    useEffect(() => {
        loadBookings();
        window.addEventListener('bookingAdded', loadBookings);
        return () => window.removeEventListener('bookingAdded', loadBookings);
    }, []);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const query = e.currentTarget.value;
            if (query.trim()) {
                navigate(`/services?query=${encodeURIComponent(query)}`);
            }
        }
    };

    const handleCancelBooking = (id) => {
        const updatedBookings = bookings.map(booking => {
            if (booking.id === id) {
                return { ...booking, status: 'canceled' };
            }
            return booking;
        });
        setBookings(updatedBookings);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    };

    const handleRateBooking = (id, rating) => {
        const updatedBookings = bookings.map(booking =>
            booking.id === id ? { ...booking, rating } : booking
        );
        setBookings(updatedBookings);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    };

    const filteredBookings = bookings.filter(booking => booking.status === activeTab);

    const handleSearchInput = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setIsSearching(true);

        if (query.trim() === '') {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        const results = [];
        Object.keys(serviceDetails).forEach((category) => {
            const categoryData = serviceDetails[category];
            categoryData.treatments.forEach((treatment) => {
                if (
                    treatment.name.toLowerCase().includes(query.toLowerCase()) ||
                    categoryData.title.toLowerCase().includes(query.toLowerCase())
                ) {
                    results.push({
                        category: categoryData.title,
                        treatment: treatment.name,
                        id: treatment.id,
                        price: treatment.price,
                        duration: treatment.duration,
                        categoryId: category,
                    });
                }
            });
        });

        setSearchResults(results);
        setIsSearching(false);
    };

    const handleSearchResultClick = (categoryId, treatmentId) => {
        navigate(`/book/${categoryId}/${treatmentId}`);
        setSearchQuery('');
        setSearchResults([]);
    };

    const getServiceSuggestions = () => {
        const allTreatments = [];
        Object.keys(serviceDetails).forEach((category) => {
            serviceDetails[category].treatments.forEach((treatment) => {
                allTreatments.push({
                    categoryId: category,
                    treatmentId: treatment.id,
                    name: treatment.name,
                    category: serviceDetails[category].title,
                });
            });
        });
        return allTreatments.sort(() => Math.random() - 0.5).slice(0, 4);
    };

    // Determine if we should render the main dashboard or the nested route
    const isDashboardHome = location.pathname === '/customer-dashboard';

    return (
        <div className="bg-gray-50 min-h-screen pt-16">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar Navigation */}
                    <div className="md:w-1/4">
                        <CustomerSidebar user={user} activePage={activePage} />
                    </div>

                    {/* Main Content */}
                    <div className="md:w-3/4">
                        {isDashboardHome ? (
                            <>
                                {/* Search Bar */}
                                <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search for beauty services or treatments..."
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                                            value={searchQuery}
                                            onChange={handleSearchInput}
                                            onKeyPress={handleSearch}
                                        />
                                        <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    </div>

                                    {searchResults.length > 0 && (
                                        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
                                            {searchResults.map((result) => (
                                                <div
                                                    key={`${result.categoryId}-${result.id}`}
                                                    className="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                                                    onClick={() => handleSearchResultClick(result.categoryId, result.id)}
                                                >
                                                    <div>
                                                        <p className="text-gray-800">{result.treatment}</p>
                                                        <p className="text-sm text-gray-500">{result.category}</p>
                                                    </div>
                                                    <div className="text-sm text-pink-400">${result.price}+</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {isSearching && (
                                        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-3">
                                            <p className="text-gray-500">Searching...</p>
                                        </div>
                                    )}
                                </div>

                                {/* Dashboard Overview */}
                                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                                    <h2 className="text-xl font-bold font-serif mb-6">Dashboard Overview</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold mb-2">Upcoming Appointments</h3>
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                                                    <Calendar className="h-6 w-6 text-pink-400" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">
                                                        {bookings.filter(b => b.status === 'upcoming').length ?
                                                            `${bookings.filter(b => b.status === 'upcoming')[0].service} with ${bookings.filter(b => b.status === 'upcoming')[0].provider}` :
                                                            'No upcoming appointments'}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {bookings.filter(b => b.status === 'upcoming').length ?
                                                            `${bookings.filter(b => b.status === 'upcoming')[0].date} at ${bookings.filter(b => b.status === 'upcoming')[0].time}` :
                                                            'Book a beauty service now'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold mb-2">Wallet Balance</h3>
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                                    <Wallet className="h-6 w-6 text-green-500" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Available Credits</p>
                                                    <p className="text-xl font-bold text-green-500">$50.00</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="font-semibold mb-3">Beauty Service Suggestions</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {getServiceSuggestions().map((suggestion) => (
                                            <button
                                                key={`${suggestion.categoryId}-${suggestion.treatmentId}`}
                                                onClick={() => navigate(`/book/${suggestion.categoryId}/${suggestion.treatmentId}`)}
                                                className="block text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300"
                                            >
                                                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 text-pink-400"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                                        />
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-medium text-gray-800">{suggestion.name}</span>
                                                <p className="text-xs text-gray-500">{suggestion.category}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Explore Beauty Services */}
                                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                                    <h2 className="text-xl font-bold font-serif mb-6">Explore Beauty Services</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {Object.keys(serviceDetails).map((category) => (
                                            <a key={category} href={`/services/${category}`} className="block group">
                                                <div className="relative rounded-xl overflow-hidden h-48">
                                                    <img
                                                        src={serviceDetails[category].heroImage}
                                                        alt={`${serviceDetails[category].title} Services`}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                                                        <h3 className="text-white text-xl font-bold">{serviceDetails[category].title}</h3>
                                                        <p className="text-white/80 text-sm">{serviceDetails[category].description}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* My Bookings Section */}
                                <div className="bg-white rounded-xl shadow-md p-6">
                                    <h2 className="text-xl font-bold font-serif mb-6">My Bookings</h2>

                                    <div className="border-b border-gray-200 mb-6">
                                        <nav className="flex space-x-8">
                                            <button
                                                onClick={() => setActiveTab('upcoming')}
                                                className={`border-b-2 ${activeTab === 'upcoming' ? 'border-pink-400 text-pink-400' : 'border-transparent text-gray-500'} px-1 py-4 font-medium`}
                                            >
                                                Upcoming
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('completed')}
                                                className={`border-b-2 ${activeTab === 'completed' ? 'border-pink-400 text-pink-400' : 'border-transparent text-gray-500'} px-1 py-4 font-medium hover:text-gray-700`}
                                            >
                                                Completed
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('canceled')}
                                                className={`border-b-2 ${activeTab === 'canceled' ? 'border-pink-400 text-pink-400' : 'border-transparent text-gray-500'} px-1 py-4 font-medium hover:text-gray-700`}
                                            >
                                                Canceled
                                            </button>
                                        </nav>
                                    </div>

                                    <div className="space-y-4">
                                        {filteredBookings.length > 0 ? (
                                            filteredBookings.map(booking => (
                                                <div
                                                    key={booking.id}
                                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div>
                                                            <h3 className="font-medium text-lg">{booking.service}</h3>
                                                            <p className="text-sm text-gray-500">{booking.provider}</p>
                                                        </div>
                                                        <div className="text-sm font-medium">
                                                            <span className={`px-3 py-1 rounded-full ${booking.status === 'upcoming' ? 'bg-blue-100 text-blue-600' :
                                                                    booking.status === 'completed' ? 'bg-green-100 text-green-600' :
                                                                        'bg-red-100 text-red-600'
                                                                }`}>
                                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                                        <div>
                                                            <p className="text-xs text-gray-500">Date</p>
                                                            <p className="text-sm">{booking.date}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Time</p>
                                                            <p className="text-sm">{booking.time}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Duration</p>
                                                            <p className="text-sm">{booking.duration}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Price</p>
                                                            <p className="text-sm">${booking.price}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        {booking.status === 'upcoming' && (
                                                            <button
                                                                className="px-4 py-2 text-sm text-red-500 border border-red-500 rounded-md hover:bg-red-50"
                                                                onClick={() => handleCancelBooking(booking.id)}
                                                            >
                                                                Cancel Booking
                                                            </button>
                                                        )}
                                                        {booking.status === 'completed' && !booking.rating && (
                                                            <div className="flex space-x-1">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <button
                                                                        key={star}
                                                                        onClick={() => handleRateBooking(booking.id, star)}
                                                                        className="text-gray-300 hover:text-yellow-400"
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                                        </svg>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                        {booking.rating && (
                                                            <div className="flex space-x-1">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <span
                                                                        key={star}
                                                                        className={star <= booking.rating ? "text-yellow-400" : "text-gray-300"}
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                        </svg>
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                        <a
                                                            href="#"
                                                            className="text-sm text-pink-400 hover:text-pink-500 hover:underline"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                // View details logic
                                                            }}
                                                        >
                                                            View Details
                                                        </a>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8">
                                                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500">No {activeTab} bookings found</p>
                                                {activeTab === 'upcoming' && (
                                                    <button
                                                        onClick={() => navigate('/services')}
                                                        className="mt-4 px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500"
                                                    >
                                                        Book a Service
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            // Render nested routes (Outlet)
                            <Outlet />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
