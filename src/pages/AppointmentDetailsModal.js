import React, { useEffect, useState } from "react";
import { fetchAppointmentDetails } from "../services/appointments";

const AppointmentDetailsModal = ({ isOpen, onClose, appointmentId }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!appointmentId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetchAppointmentDetails(appointmentId);
        setDetails(response.data);
      } catch (err) {
        console.error("Error fetching appointment details:", err);
        setError("Failed to fetch appointment details.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && appointmentId) {
      fetchDetails();
    }
  }, [appointmentId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Appointment Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          {loading && (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}

          {details && (
            <div className="space-y-6">
              {/* Basic Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Therapist</p>
                    <p className="font-medium">{details.therapist_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date & Time</p>
                    <p className="font-medium">{details.date} at {details.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <p className="font-medium">{details.status}</p>
                  </div>
                </div>
              </div>

              {/* Patient Notes */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Patient Notes</h3>
                <div className="space-y-4">
                  {details.patient_notes && details.patient_notes.map((note) => (
                    <div key={note.id} className="bg-gray-50 p-3 rounded">
                      <div className="text-sm text-gray-500 mb-1">{note.created_at}</div>
                      <div className="mb-2">
                        <span className="font-medium">Diagnosis: </span>{note.diagnosis}
                      </div>
                      <div>
                        <span className="font-medium">Notes: </span>{note.notes}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatments */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Treatments</h3>
                <div className="space-y-4">
                  {details.treatments && details.treatments.map((treatment) => (
                    <div key={treatment.id} className="bg-gray-50 p-3 rounded">
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                          <span className="font-medium">Start Date: </span>{treatment.start_date}
                        </div>
                        <div>
                          <span className="font-medium">End Date: </span>{treatment.end_date}
                        </div>
                      </div>
                      <div className="mb-2">
                        <span className="font-medium">Prescription: </span>{treatment.prescription}
                      </div>
                      <div>
                        <span className="font-medium">Notes: </span>{treatment.notes}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;
