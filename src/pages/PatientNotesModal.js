import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchScheduledAppointment } from "../services/appointments"; 

const PatientNotesModal = ({ isOpen, onClose, appointment, onSubmit }) => {
  const [notes, setNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [error, setError] = useState("");
  const [scheduledAppointmentId, setScheduledAppointmentId] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      if (isOpen && appointment.id) {
        try {
          const response = await fetchScheduledAppointment(appointment.id);
          const scheduledAppointment = response.scheduled_appointment; 
          
          setScheduledAppointmentId(scheduledAppointment.id); 

          alert(`Scheduled Appointment ID: ${scheduledAppointment.id}`);
        } catch (err) {
          console.error("Error fetching scheduled appointment:", err);
          setError("Failed to fetch appointment details.");
        }
      }
    };

    fetchAppointment();
  }, [isOpen, appointment]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!notes || !diagnosis || !scheduledAppointmentId) {
      setError("All fields are required.");
      return;
    }
  
    const notesData = {
      scheduled_appointment_id: scheduledAppointmentId,  
      notes,
      diagnosis,
    };
  
    onSubmit(notesData); 
    setNotes("");
    setDiagnosis("");
    setError("");
  };
  
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? "block" : "hidden"}`}
      aria-modal="true"
      role="dialog"
    >
      <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg z-10 p-6 max-w-sm mx-auto">
        <h2 className="text-xl font-semibold mb-4">Submit Patient Notes</h2>
        {error && <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-2 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              className="border border-gray-300 rounded-md p-2 w-full"
              rows="4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

PatientNotesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PatientNotesModal;
