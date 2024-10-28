import React, { useState, useEffect } from 'react';

const AppointmentModal = ({ isOpen, onClose, appointment, onSubmit }) => {
  const [scheduledTime, setScheduledTime] = useState("");
  const [action, setAction] = useState("SCHEDULED");

  useEffect(() => {
    setScheduledTime(appointment?.scheduled_time || "");
    setAction(appointment?.status || "SCHEDULED");
  }, [appointment]);

  const handleSubmit = () => {
    onSubmit({ ...appointment, scheduled_time: scheduledTime, status: action });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6" id="modal-title">
                  Manage Appointment
                </h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Appointment Time
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Appointment Status
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="schedule"
                        name="action"
                        value="SCHEDULED"
                        checked={action === "SCHEDULED"}
                        onChange={(e) => setAction(e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="schedule" className="ml-2 block text-sm text-gray-700">
                        Schedule
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="cancel"
                        name="action"
                        value="CANCELLED"
                        checked={action === "CANCELLED"}
                        onChange={(e) => setAction(e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="cancel" className="ml-2 block text-sm text-gray-700">
                        Cancel
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                action === "SCHEDULED" 
                  ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" 
                  : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
              } focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              {action === "SCHEDULED" ? "Schedule Appointment" : "Cancel Appointment"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
