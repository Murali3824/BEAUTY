import { Settings } from 'lucide-react';

const AccountSettings = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'Professional',
    email: 'professional@example.com',
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <Settings className="h-8 w-8 text-pink-400 mr-3" />
        <h2 className="text-xl font-bold font-serif">Account Settings</h2>
      </div>
      <p className="text-gray-500 mb-4">Manage your account settings and preferences.</p>
      
      {/* Account Form */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue="Jane" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue="Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue={user.email} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue="+1 (555) 123-4567" />
            </div>
          </div>
        </form>
      </div>
      
      {/* Password Section */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Password</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
        </form>
      </div>
      
      {/* Notification Preferences */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">Get notified about new appointments</p>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
              <input type="checkbox" className="absolute opacity-0 w-0 h-0" defaultChecked={true} />
              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-6"></span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-gray-500">Receive text messages for appointment reminders</p>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
              <input type="checkbox" className="absolute opacity-0 w-0 h-0" defaultChecked={true} />
              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-6"></span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Communications</p>
              <p className="text-sm text-gray-500">Receive updates about promotions and news</p>
            </div>
            <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
              <input type="checkbox" className="absolute opacity-0 w-0 h-0" defaultChecked={false} />
              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300">
          Cancel
        </button>
        <button className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition duration-300">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
