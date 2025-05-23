import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Plus, X, Check, Calendar } from 'lucide-react';

const ScheduleAvailability = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [newSlot, setNewSlot] = useState({ startTime: '09:00', endTime: '17:00' });
  const [weeklySchedule, setWeeklySchedule] = useState({
    monday: { isWorking: true, slots: [{ startTime: '09:00', endTime: '17:00' }] },
    tuesday: { isWorking: true, slots: [{ startTime: '09:00', endTime: '17:00' }] },
    wednesday: { isWorking: true, slots: [{ startTime: '09:00', endTime: '17:00' }] },
    thursday: { isWorking: true, slots: [{ startTime: '09:00', endTime: '17:00' }] },
    friday: { isWorking: true, slots: [{ startTime: '09:00', endTime: '17:00' }] },
    saturday: { isWorking: true, slots: [{ startTime: '10:00', endTime: '15:00' }] },
    sunday: { isWorking: false, slots: [] }
  });

  // Helper function to get lowercase day of week
  const getDayOfWeek = (date) => 
    new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  // Load schedule from localStorage and update slots on mount
  useEffect(() => {
    const savedSchedule = localStorage.getItem('weeklySchedule');
    if (savedSchedule) {
      setWeeklySchedule(JSON.parse(savedSchedule));
    }
    updateAvailableSlots(selectedDate);
  }, [selectedDate]);

  // Save schedule to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('weeklySchedule', JSON.stringify(weeklySchedule));
  }, [weeklySchedule]);

  const updateAvailableSlots = (date) => {
    const dayOfWeek = getDayOfWeek(date);
    setAvailableSlots(weeklySchedule[dayOfWeek]?.slots || []);
  };

  const prevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
    updateAvailableSlots(newDate);
  };

  const nextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
    updateAvailableSlots(newDate);
  };

  const addSlot = () => {
    if (!newSlot.startTime || !newSlot.endTime) return;
    if (newSlot.endTime <= newSlot.startTime) {
      alert('End time must be after start time');
      return;
    }
    
    const dayOfWeek = getDayOfWeek(selectedDate);
    const updatedSchedule = { ...weeklySchedule };
    updatedSchedule[dayOfWeek].slots.push({ ...newSlot });
    setWeeklySchedule(updatedSchedule);
    setAvailableSlots(updatedSchedule[dayOfWeek].slots);
    setShowAddSlot(false);
    setNewSlot({ startTime: '09:00', endTime: '17:00' });
  };

  const removeSlot = (index) => {
    const dayOfWeek = getDayOfWeek(selectedDate);
    const updatedSchedule = { ...weeklySchedule };
    updatedSchedule[dayOfWeek].slots.splice(index, 1);
    setWeeklySchedule(updatedSchedule);
    setAvailableSlots(updatedSchedule[dayOfWeek].slots);
  };

  const toggleWorkingDay = (day) => {
    const updatedSchedule = { ...weeklySchedule };
    updatedSchedule[day].isWorking = !updatedSchedule[day].isWorking;
    setWeeklySchedule(updatedSchedule);
  };

  const handleSave = () => {
    alert('Schedule saved successfully!');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold font-serif mb-6">Schedule & Availability</h2>

      {/* Daily Schedule Section */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-4">Daily Availability</h3>
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevDay} className="p-2 rounded-lg border">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h4 className="text-lg font-medium">
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h4>
          <button onClick={nextDay} className="p-2 rounded-lg border">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Available Time Slots</h4>
            <button 
              onClick={() => setShowAddSlot(!showAddSlot)}
              className="flex items-center text-pink-400 hover:text-pink-500"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Slot
            </button>
          </div>

          {showAddSlot && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h5 className="font-medium mb-2">Add New Time Slot</h5>
              <div className="flex flex-wrap gap-4 mb-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={newSlot.startTime}
                    onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                    className="border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">End Time</label>
                  <input
                    type="time"
                    value={newSlot.endTime}
                    onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                    className="border rounded-lg p-2"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={addSlot}
                  className="px-3 py-1 bg-pink-400 text-white rounded-lg hover:bg-pink-500"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddSlot(false)}
                  className="px-3 py-1 border rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {availableSlots.length > 0 ? (
              availableSlots.map((slot, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{slot.startTime} - {slot.endTime}</span>
                  </div>
                  <button
                    onClick={() => removeSlot(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No availability set for this day
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Weekly Schedule Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Weekly Schedule Template</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(weeklySchedule).map(([day, { isWorking, slots }]) => (
            <div key={day} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium capitalize">{day}</h4>
                <div className="flex items-center">
                  <span className="text-sm mr-2">Working Day</span>
                  <button
                    onClick={() => toggleWorkingDay(day)}
                    className={`w-10 h-5 rounded-full flex items-center transition-colors duration-300 ${
                      isWorking ? "bg-pink-400" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white shadow-md transform duration-300 ${
                        isWorking ? "translate-x-5" : "translate-x-1"
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
              {isWorking ? (
                slots.length > 0 ? (
                  <div className="text-sm text-gray-600">
                    {slots.map((slot, idx) => (
                      <div key={idx} className="mb-1 last:mb-0">
                        {slot.startTime} - {slot.endTime}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">No slots configured</div>
                )
              ) : (
                <div className="text-sm text-gray-500">Not working</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleSave}
          className="px-6 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition duration-300"
        >
          Save Schedule
        </button>
      </div>
    </div>
  );
};

export default ScheduleAvailability;