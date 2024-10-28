// services/moodEntries.js

import api from './api'; // Ensure this imports your configured axios instance

// Fetch mood entries for a specific user
export const getMoodEntries = async (userId) => {
    try {
        const response = await api.get(`/mood-entries/${userId}`); // Adjust endpoint as needed
        return response.data; // Return the data directly for easier use
    } catch (error) {
        throw new Error('Failed to fetch mood entries'); // Handle the error as needed
    }
};

// Create a new mood entry for a specific user
export const createMoodEntry = async (userId, entry) => {
    try {
        const response = await api.post(`/mood-entries/${userId}`, entry); // Adjust endpoint as needed
        return response.data; // Return the created entry data
    } catch (error) {
        throw new Error('Failed to create mood entry'); // Handle the error as needed
    }
};
