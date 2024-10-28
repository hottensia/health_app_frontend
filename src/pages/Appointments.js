import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAppointments,
  manageAppointment,
  submitPatientNotes,
  manageTreatment,
} from "../services/appointments";
import { AppointmentContext } from "../contexts/AppointmentContext";
import AppointmentModal from "./AppointmentModal";
import PatientNotesModal from "./PatientNotesModal";
import ManageTreatmentModal from "./ManageTreatmentModal";
import AppointmentDetailsModal from "./AppointmentDetailsModal";

const Appointments = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [modals, setModals] = useState({
    appointment: false,
    patientNotes: false,
    manageTreatment: false,
    details: false,
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { appointments, setAppointments } = useContext(AppointmentContext);
  const isPatient = localStorage.getItem("user_type") === "PATIENT";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAppointments = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User ID not found in local storage");
        setLoading(false);
        return;
      }
      try {
        const response = await fetchAppointments(userId);
        setAppointments(response.data.appointments || []);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };
    fetchUserAppointments();
  }, [setAppointments]);

  const getStatusColor = (status) => {
    const statusColors = {
      scheduled: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800",
      no_show: "bg-gray-100 text-gray-800",
      booked: "bg-purple-100 text-purple-800",
      ongoing: "bg-teal-100 text-teal-800",
      almost_complete: "bg-orange-100 text-orange-800",
    };
    return statusColors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const openModal = (modalType, appointment) => {
    setSelectedAppointment((prev) => ({
      ...appointment,
      patient_note_id: appointment.patient_note_id || prev?.patient_note_id,
    }));
    setModals((prev) => ({ ...prev, [modalType]: true }));
  };

  const closeAllModals = () => {
    setModals({
      appointment: false,
      patientNotes: false,
      manageTreatment: false,
      details: false,
    });
    setSelectedAppointment(null);
  };

  const handleAppointmentAction = async (appointmentData) => {
    try {
      const updatedData = {
        status: appointmentData.status,
        scheduled_time: appointmentData.scheduled_time,
      };

      await manageAppointment(appointmentData.id, updatedData);

      setSuccessMessage(
        appointmentData.status === "SCHEDULED"
          ? "Appointment successfully rescheduled!"
          : "Appointment successfully cancelled!"
      );

      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === appointmentData.id ? { ...appt, ...updatedData } : appt
        )
      );
    } catch (error) {
      console.error(
        "Error managing appointment:",
        error.response?.data || error.message
      );
      setError("Failed to manage appointment. Please try again.");
    }
  };

  const handleSubmitPatientNotes = async (notesData) => {
    try {
      if (!selectedAppointment || !selectedAppointment.id) {
        setError("Scheduled appointment ID is missing.");
        return;
      }

      await submitPatientNotes(notesData);

      setSuccessMessage("Patient notes successfully submitted!");
      closeAllModals();
    } catch (error) {
      console.error(
        "Error submitting patient notes:",
        error.response?.data || error.message
      );
      setError("Failed to submit patient notes. Please try again.");
    }
  };

  const handleManageTreatmentSubmit = async (treatmentData) => {
    try {
      const updatedTreatmentData = {
        ...treatmentData,
      };

      await manageTreatment(updatedTreatmentData);
      setSuccessMessage("Treatment successfully managed!");
      closeAllModals();
    } catch (error) {
      console.error(
        "Error managing treatment:",
        error.response?.data || error.message
      );
      setError("Failed to manage treatment. Please try again.");
    }
  };

  const handleStartChat = (appointmentId) => {
    console.log("Starting chat for appointment ID:", appointmentId);
    navigate(`/chat/${appointmentId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
          <div className="h-4 bg-gray-200 rounded w-52"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-10 p-5">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          {error}
        </div>
      </div>
    );
  }

  if (!appointments.length) {
    return (
      <div className="container mx-auto mt-10 p-5">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-col items-center justify-center h-64 p-6">
            <p className="text-xl text-gray-600">No appointments scheduled</p>
            {!isPatient && (
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Schedule New Appointment
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 p-5">
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-4">
          {successMessage}
        </div>
      )}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">My Appointments</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Therapist
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  {!isPatient && (
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {appointment.therapist_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {appointment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {appointment.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {appointment.status.toLowerCase() === "pending" &&
                        !isPatient && (
                          <button
                            className="px-3 py-1 text-sm border border-yellow-300 text-yellow-600 rounded-md hover:bg-yellow-50 transition-colors"
                            onClick={() =>
                              openModal("appointment", appointment)
                            }
                          >
                            &#x270E; Manage Appointment
                          </button>
                        )}
                      {appointment.status.toLowerCase() === "booked" && (
                        <button
                          className="ml-2 px-3 py-1 text-sm border border-purple-300 text-purple-600 rounded-md hover:bg-purple-50 transition-colors"
                          onClick={() => handleStartChat(appointment.id)}
                        >
                          &#x1F4AC; Start Chat
                        </button>
                      )}
                      {appointment.status.toLowerCase() === "ongoing" && (
                        <>
                          {!isPatient && (
                            <button
                              className="ml-2 px-3 py-1 text-sm border border-blue-300 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                              onClick={() =>
                                openModal("patientNotes", appointment)
                              }
                            >
                              &#x1F4DD; Patient Notes
                            </button>
                          )}
                          <button
                            className="ml-2 px-3 py-1 text-sm border border-teal-300 text-teal-600 rounded-md hover:bg-teal-50 transition-colors"
                            onClick={() => handleStartChat(appointment.id)}
                          >
                            &#x1F4AC; Start Chat
                          </button>
                        </>
                      )}
                      {appointment.status.toLowerCase() ===
                        "almost_complete" && (
                        <>
                          {!isPatient && (
                            <button
                              className="ml-2 px-3 py-1 text-sm border border-green-300 text-green-600 rounded-md hover:bg-green-50 transition-colors"
                              onClick={() =>
                                openModal("manageTreatment", appointment)
                              }
                            >
                              &#x1F48A; Manage Treatment
                            </button>
                          )}
                          <button
                            className="ml-2 px-3 py-1 text-sm border border-teal-300 text-teal-600 rounded-md hover:bg-teal-50 transition-colors"
                            onClick={() => handleStartChat(appointment.id)}
                          >
                            &#x1F4AC; Start Chat
                          </button>
                        </>
                      )}
                      {appointment.status.toLowerCase() === "completed" && (
                        <>
                          <button
                            className="ml-2 px-3 py-1 text-sm border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
                            onClick={() => openModal("details", appointment)}
                          >
                            &#x1F4C3; Details
                          </button>
                          <button
                            className="ml-2 px-3 py-1 text-sm border border-teal-300 text-teal-600 rounded-md hover:bg-teal-50 transition-colors"
                            onClick={() => handleStartChat(appointment.id)}
                          >
                            &#x1F4AC; Start Chat
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modals.appointment && (
        <AppointmentModal
          isOpen={modals.appointment}
          appointment={selectedAppointment}
          onClose={closeAllModals}
          onSubmit={handleAppointmentAction}
        />
      )}
      {modals.patientNotes && (
        <PatientNotesModal
          isOpen={modals.patientNotes}
          appointment={selectedAppointment}
          onClose={closeAllModals}
          onSubmit={handleSubmitPatientNotes}
        />
      )}
      {modals.manageTreatment && (
        <ManageTreatmentModal
          isOpen={modals.manageTreatment}
          appointment={selectedAppointment}
          onClose={closeAllModals}
          onSubmit={handleManageTreatmentSubmit}
        />
      )}
      {modals.details && (
        <AppointmentDetailsModal
          isOpen={modals.details}
          appointmentId={selectedAppointment.id}
          onClose={closeAllModals}
        />
      )}
    </div>
  );
};

export default Appointments;
