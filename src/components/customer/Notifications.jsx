import { useState, useEffect } from 'react';
import { Bell, CheckCircle } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load notifications from localStorage
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      // Mock data if none exists
      const mockNotifications = [
        {
          id: 1,
          message: 'Your booking for Luxury Facial is confirmed for tomorrow!',
          date: '2025-05-24',
          read: false,
        },
        {
          id: 2,
          message: 'New promotion: 20% off Hair Coloring this week!',
          date: '2025-05-23',
          read: false,
        },
        {
          id: 3,
          message: 'Your rating for Deep Tissue Massage was submitted.',
          date: '2025-05-22',
          read: true,
        },
      ];
      setNotifications(mockNotifications);
      localStorage.setItem('notifications', JSON.stringify(mockNotifications));
    }
  }, []);

  const handleMarkAsRead = (id) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold font-playfair mb-6">Notifications</h2>
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 ${
                notification.read ? 'bg-beautyluxe-gray' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-lato ${notification.read ? 'text-muted-foreground' : 'text-charcoal'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground font-lato">{notification.date}</p>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="text-blush-pink hover:text-beauty-rose"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-muted-foreground font-lato">No notifications found</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
