import { useState } from 'react';
import { User, Plus, Edit, Trash } from 'lucide-react';

const ProfileServices = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [services, setServices] = useState([
    { id: 1, name: 'Haircut', description: 'Professional haircut services for all types of hair', price: 30, duration: '30 min' },
    { id: 2, name: 'Hair Coloring', description: 'Premium hair coloring with quality products', price: 75, duration: '90 min' },
    { id: 3, name: 'Facial', description: 'Rejuvenating facial treatment for glowing skin', price: 45, duration: '45 min' },
    { id: 4, name: 'Manicure', description: 'Detailed nail care for beautiful hands', price: 25, duration: '30 min' }
  ]);
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    title: 'Senior Hair Stylist',
    bio: 'Experienced hair stylist with over 8 years of salon experience specializing in hair cutting, coloring, and styling. Passionate about helping clients find their perfect look.',
    specialties: ['Hair Cutting', 'Hair Coloring', 'Styling', 'Extensions'],
    experience: '8 years',
    education: 'Certified from Paul Mitchell School of Cosmetology',
    languages: ['English', 'Spanish']
  });
  
  const [editingService, setEditingService] = useState(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({ name: '', description: '', price: '', duration: '' });
  
  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };
  
  const handleEditService = (service) => {
    setEditingService({ ...service });
  };
  
  const handleUpdateService = () => {
    setServices(services.map(s => s.id === editingService.id ? editingService : s));
    setEditingService(null);
  };
  
  const handleAddService = () => {
    const id = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
    setServices([...services, { ...newService, id, price: Number(newService.price) }]);
    setNewService({ name: '', description: '', price: '', duration: '' });
    setIsAddingService(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <User className="h-8 w-8 text-pink-400 mr-3" />
        <h2 className="text-xl font-bold font-serif">Profile & Services</h2>
      </div>
      
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`border-b-2 ${activeTab === 'profile' ? 'border-pink-400 text-pink-400' : 'border-transparent text-gray-500'} px-1 py-4 font-medium`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`border-b-2 ${activeTab === 'services' ? 'border-pink-400 text-pink-400' : 'border-transparent text-gray-500'} px-1 py-4 font-medium hover:text-gray-700`}
          >
            Services Offered
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`border-b-2 ${activeTab === 'portfolio' ? 'border-pink-400 text-pink-400' : 'border-transparent text-gray-500'} px-1 py-4 font-medium hover:text-gray-700`}
          >
            Portfolio
          </button>
        </nav>
      </div>
      
      {activeTab === 'profile' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <button className="px-4 py-2 text-sm border border-pink-400 text-pink-400 rounded-md hover:bg-pink-50 transition-colors duration-200">
              Edit Profile
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="col-span-1">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-4xl font-bold text-pink-400">
                  {profile.name.charAt(0)}
                </div>
                <button className="mt-2 px-3 py-1 text-xs bg-pink-400 text-white rounded-md hover:bg-pink-500 transition-colors duration-200">
                  Change Photo
                </button>
              </div>
            </div>
            
            <div className="col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    value={profile.name} 
                    readOnly 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    value={profile.title} 
                    readOnly 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                  rows="4" 
                  value={profile.bio} 
                  readOnly 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    value={profile.experience} 
                    readOnly 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    value={profile.education} 
                    readOnly 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialties</label>
                <div className="flex flex-wrap gap-2">
                  {profile.specialties.map((specialty, index) => (
                    <span key={index} className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((language, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'services' && (
        <div>
          <div className="flex justify-between mb-6">
            <h3 className="text-lg font-semibold">Services Offered</h3>
            <button 
              className="flex items-center px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition-colors duration-200"
              onClick={() => setIsAddingService(true)}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Service
            </button>
          </div>
          
          {isAddingService && (
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold mb-3">Add New Service</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    value={newService.name}
                    onChange={(e) => setNewService({...newService, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    rows="2" 
                    value={newService.description}
                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                      value={newService.price}
                      onChange={(e) => setNewService({...newService, price: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                      placeholder="e.g. 30 min" 
                      value={newService.duration}
                      onChange={(e) => setNewService({...newService, duration: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsAddingService(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition-colors duration-200"
                    onClick={handleAddService}
                  >
                    Add Service
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {editingService && (
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold mb-3">Edit Service</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    value={editingService.name}
                    onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    rows="2" 
                    value={editingService.description}
                    onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                      value={editingService.price}
                      onChange={(e) => setEditingService({...editingService, price: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                      value={editingService.duration}
                      onChange={(e) => setEditingService({...editingService, duration: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setEditingService(null)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition-colors duration-200"
                    onClick={handleUpdateService}
                  >
                    Update Service
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {services.map(service => (
              <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{service.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-sm font-medium text-green-600">${service.price}</span>
                      <span className="text-sm text-gray-500">{service.duration}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="p-2 text-gray-500 hover:text-pink-400 transition-colors duration-200"
                      onClick={() => handleEditService(service)}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'portfolio' && (
        <div>
          <div className="flex justify-between mb-6">
            <h3 className="text-lg font-semibold">Your Work Portfolio</h3>
            <button className="flex items-center px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 transition-colors duration-200">
              <Plus className="h-4 w-4 mr-1" /> Add Photos
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <svg className="h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="p-3">
                  <p className="font-medium">Hair Example #{index+1}</p>
                  <p className="text-xs text-gray-500">Added on May {10+index}, 2025</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
              View All Portfolio Items
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileServices;
