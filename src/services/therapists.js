
import api from './api'; 

export const getTherapistDetails = async (therapistId) => {
    try {
        const response = await api.get(`/users/${therapistId}`); 
        return response; 
    } catch (error) {
        throw new Error('Failed to fetch therapist details'); 
    }
};

export const getTherapists = async () => {
    try {
        const response = await api.get('/therapists'); 
        console.log("Therapists response:", response.data);
        return response; 
    } catch (error) {
        throw new Error('Failed to fetch therapists'); 
    }
};

export const getUserTherapists = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}/therapists`); 
        return response; 
    } catch (error) {
        throw new Error('Failed to fetch user therapists'); 
    }
};
