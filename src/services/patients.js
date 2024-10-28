import api from './api'; 

export const getTherapistPatients = async () => {
    const userId = localStorage.getItem("userId"); 
    if (!userId) {
        throw new Error('User ID not found in local storage');
    }

    try {
        const response = await api.get(`/therapist/${userId}/patients`); 
        return response.data; 
    } catch (error) {
        throw new Error('Failed to fetch patients'); 
    }
};

export const getPatientTherapists = async () => {
    const userId = localStorage.getItem("userId"); 
    if (!userId) {
        throw new Error('User ID not found in local storage');
    }

    try {
        const response = await api.get(`/patient/${userId}/therapists`); 
        return response.data; 
    } catch (error) {
        throw new Error('Failed to fetch therapists'); 
    }
};
