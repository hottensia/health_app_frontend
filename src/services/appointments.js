import api from "./api";

export const bookAppointment = (appointmentData) => {
  const formattedData = {
    patient_id: appointmentData.patient_id,
    therapist_id: appointmentData.therapist_id,
    date: appointmentData.date,
    time: appointmentData.time,
    notes: appointmentData.notes,
  };

  return api.post(`/appointments`, formattedData);
};

export const fetchAppointments = async (userId) => {
  const response = await api.get(`/appointments/user/${userId}`);
  return response;
};

export const cancelAppointment = (appointmentId, data) => {
  return api.put(`/appointments/${appointmentId}`, data);
};

export const updateAppointment = (appointmentId, data) => {
  return api.put(`/appointments/${appointmentId}`, data);
};

export const manageAppointment = async (appointmentId, updatedData) => {
  try {
    console.log("Sending data to manage appointment:", {
      appointmentId,
      updatedData,
    });

    const response = await api.post(`/scheduled_appointments`, {
      appointment_id: appointmentId,
      ...updatedData,
    });

    console.log("Manage appointment response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in manageAppointment function:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const fetchScheduledAppointment = async (appointmentId) => {
  try {
    const response = await api.get(`/scheduled_appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching scheduled appointment:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchPatientNoteById = async (patientNoteId) => {
  try {
    const response = await api.get(`/patient_notes/${patientNoteId}`);
    
    alert(`Fetched patient note ID: ${response.data.id}`);

    return response.data; 
  } catch (error) {
    console.error(
      "Error fetching patient note by ID:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const submitPatientNotes = async (notesData) => {
  try {
    const { scheduled_appointment_id, notes, diagnosis } = notesData; 

    if (!scheduled_appointment_id || !notes || !diagnosis) {
      throw new Error("Invalid parameters: scheduled_appointment_id, notes, and diagnosis are required.");
    }

    const response = await api.post(`/patient_notes`, {
      scheduled_appointment_id, 
      notes,
      diagnosis,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error submitting patient notes:",
      error.response?.data || error.message
    );
    throw error; 
  }
};


export const manageTreatment = async (treatmentData) => {
  try {
    console.log("Sending data to manage treatment:", treatmentData);

    const response = await api.post(`/treatments`, treatmentData);

    console.log("Manage treatment response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in manageTreatment function:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchAppointmentDetails = async (appointmentId) => {
  alert(`Fetching details for appointment ID: ${appointmentId}`);
  return api.get(`/appointment-details/${appointmentId}`);
};

