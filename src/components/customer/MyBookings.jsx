import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Bell, Star } from 'lucide-react';

const MyBookings = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    const loadBookings = () => {
        const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
        setBookings(storedBookings);
    };

    useEffect(() => {
        loadBookings();
        window.addEventListener('bookingAdded', loadBookings);
        return () => window.removeEventListener('bookingAdded', loadBookings);
    }, []);

    const handleCancelBooking = (id) => {
        const updatedBookings = bookings.map((booking) =>
            booking.id === id ? { ...booking, status: 'canceled' } : booking
        );
        setBookings(updatedBookings);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    };

    const handleRateBooking = (id, rating) => {
        const updatedBookings = bookings.map((booking) =>
            booking.id === id ? { ...booking, rating } : booking
        );
        setBookings(updatedBookings);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    };

    const filteredBookings = bookings.filter((booking) => booking.status === activeTab);

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-3xl font-playfair font-medium text-gray-800 mb-6">My Bookings</h1>
            <div className="border-b border-fuchsia-300/20 mb-6">
                <nav className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`border-b-2 ${activeTab === 'upcoming' ? 'border-fuchsia-500 text-fuchsia-500' : 'border-transparent text-gray-500'} px-1 py-4 font-lato font-medium`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`border-b-2 ${activeTab === 'completed' ? 'border-fuchsia-500 text-fuchsia-500' : 'border-transparent text-gray-500'} px-1 py-4 font-lato font-medium hover:text-gray-700`}
                    >
                        Completed
                    </button>
                    <button
                        onClick={() => setActiveTab('canceled')}
                        className={`border-b-2 ${activeTab === 'canceled' ? 'border-fuchsia-500 text-fuchsia-500' : 'border-transparent text-gray-500'} px-1 py-4 font-lato font-medium hover:text-gray-700`}
                    >
                        Canceled
                    </button>
                </nav>
            </div>
            <div className="space-y-4">
                {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                        <div key={booking.id} className="border border-fuchsia-300/20 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-lato font-semibold text-gray-800">{booking.service}</h4>
                                    <p className="text-sm text-gray-500 font-lato">Provider: {booking.provider}</p>
                                    <p className="text-sm text-gray-500 font-lato">{booking.date} at {booking.time}</p>
                                    {booking.rating && (
                                        <div className="flex items-center mt-1">
                                            <span className="text-sm text-gray-500 mr-1 font-lato">Rating:</span>
                                            {[...Array(booking.rating)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="space-x-2">
                                    {booking.status === 'upcoming' && (
                                        <>
                                            <button
                                                onClick={() => handleCancelBooking(booking.id)}
                                                className="text-red-500 hover:underline font-lato"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => console.log(`Reschedule booking ${booking.id}`)}
                                                className="text-fuchsia-500 hover:underline font-lato"
                                            >
                                                Reschedule
                                            </button>
                                        </>
                                    )}
                                    {booking.status === 'completed' && !booking.rating && (
                                        <button
                                            onClick={() => handleRateBooking(booking.id, 5)}
                                            className="text-fuchsia-500 hover:underline font-lato"
                                        >
                                            Rate
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <Bell className="h-12 w-12 text-fuchsia-500/30 mx-auto mb-4" />
                        <p className="text-gray-500 font-lato">No {activeTab} bookings found</p>
                        {activeTab === 'upcoming' && (
                            <button
                                onClick={() => navigate('/services')}
                                className="mt-4 px-4 py-2 bg-fuchsia-500 text-white rounded-md hover:bg-fuchsia-600 font-lato"
                            >
                                Book a Beauty Service
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;