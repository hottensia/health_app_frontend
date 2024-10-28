import React, { useEffect, useState } from 'react';

const ManageTreatmentModal = ({ isOpen, onClose, appointment, onSubmit }) => {
  const [treatmentData, setTreatmentData] = useState({
    patient_id: '',
    therapist_id: '',
    notes: '',
    prescription: '',
    start_date: '',
    end_date: '',
    appointment_id: '',
  });

  useEffect(() => {
    if (appointment) {
      setTreatmentData({
        patient_id: appointment.patient_id,
        therapist_id: appointment.therapist_id,
        notes: '', 
        prescription: '',
        start_date: '',
        end_date: '',
        appointment_id: appointment.id,
      });
    }
  }, [appointment, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTreatmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(treatmentData);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? "block" : "hidden"}`} aria-modal="true" role="dialog">
      <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg z-10 p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Manage Treatment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={treatmentData.notes}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="prescription" className="block text-sm font-medium text-gray-700">Prescription</label>
            <input
              id="prescription"
              name="prescription"
              type="text"
              value={treatmentData.prescription}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                id="start_date"
                name="start_date"
                type="date"
                value={treatmentData.start_date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                id="end_date"
                name="end_date"
                type="date"
                value={treatmentData.end_date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="button" className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageTreatmentModal;
