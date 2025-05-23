import { useState } from 'react';
import { Calendar, Search } from 'lucide-react';

const Jobs = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [jobs, setJobs] = useState(() => {
    return JSON.parse(localStorage.getItem('jobs')) || [
      { id: 1, service: 'Haircut', date: '2025-05-25', time: '10:00 AM', status: 'new', customer: 'Alice Brown', price: 30 },
      { id: 2, service: 'Massage', date: '2025-05-20', time: '2:00 PM', status: 'completed', customer: 'Bob Smith', price: 50, rating: 4.5 },
      { id: 3, service: 'Facial', date: '2025-05-28', time: '3:30 PM', status: 'new', customer: 'Carol Davis', price: 45 },
      { id: 4, service: 'Manicure', date: '2025-05-24', time: '11:00 AM', status: 'ongoing', customer: 'David Wilson', price: 25 },
      { id: 5, service: 'Hair Coloring', date: '2025-05-29', time: '1:00 PM', status: 'new', customer: 'Emma Martinez', price: 70 }
    ];
  });

  const handleJobAction = (id, action) => {
    let updatedJobs;
    if (action === 'accept') {
      updatedJobs = jobs.map(job =>
        job.id === id ? { ...job, status: 'ongoing' } : job
      );
    } else if (action === 'reject') {
      updatedJobs = jobs.map(job =>
        job.id === id ? { ...job, status: 'canceled' } : job
      );
    } else {
      updatedJobs = jobs.map(job =>
        job.id === id ? { ...job, status: 'completed' } : job
      );
    }
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  const filteredJobs = jobs.filter(job => job.status === activeTab);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="h-8 w-8 text-pink-400 mr-3" />
          <h2 className="text-xl font-bold font-serif">Jobs Management</h2>
        </div>
        
        {/* Search */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
      
      <p className="text-gray-500 mb-4">Manage all your beauty service appointments in one place.</p>
      
      {/* Job Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('new')}
            className={`border-b-2 ${activeTab === 'new' ? 'border-pink-400 text-pink-400' : 'border-transparent text-gray-500'} px-1 py-4 font-medium`}
          >
            New Requests ({jobs.filter(job => job.status === 'new').length})
          </button>
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`border-b-2 ${activeTab === 'ongoing' ? 'border-pink-400 text-pink-400' : 'border-transparent text-gray-500'} px-1 py-4 font-medium hover:text-gray-700`}
          >
            Ongoing ({jobs.filter(job => job.status === 'ongoing').length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`border-b-2 ${activeTab === 'completed' ? 'border-pink-400 text-pink-400' : 'border-transparent text-gray-500'} px-1 py-4 font-medium hover:text-gray-700`}
          >
            Completed ({jobs.filter(job => job.status === 'completed').length})
          </button>
          <button
            onClick={() => setActiveTab('canceled')}
            className={`border-b-2 ${activeTab === 'canceled' ? 'border-pink-400 text-pink-400' : 'border-transparent text-gray-500'} px-1 py-4 font-medium hover:text-gray-700`}
          >
            Canceled ({jobs.filter(job => job.status === 'canceled').length})
          </button>
        </nav>
      </div>
      
      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-3">
                      {job.customer.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{job.service}</h4>
                      <p className="text-sm text-gray-500">Customer: {job.customer}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Date: {job.date} at {job.time}</p>
                    <p className="text-sm text-gray-500">Price: ${job.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  {job.status === 'new' && (
                    <div className="space-y-2">
                      <button
                        onClick={() => handleJobAction(job.id, 'accept')}
                        className="block w-full px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition-colors duration-200"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleJobAction(job.id, 'reject')}
                        className="block w-full px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors duration-200"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                  {job.status === 'ongoing' && (
                    <button
                      onClick={() => handleJobAction(job.id, 'complete')}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                    >
                      Mark Complete
                    </button>
                  )}
                  {job.status === 'completed' && job.rating && (
                    <div className="flex items-center justify-end">
                      <span className="text-sm text-gray-500 mr-1">Rating:</span>
                      <div className="flex text-yellow-500">
                        {[...Array(Math.floor(job.rating || 0))].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  )}
                  {job.status === 'canceled' && (
                    <span className="text-sm text-red-500">Canceled</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No {activeTab} jobs found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
