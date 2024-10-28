// services/users.js
import api from "./api";

export const getUserProfile = () => {
  const userId = localStorage.getItem("userId");
  return api.get(`/users/${userId}`);
};

export const updateUserProfile = (userId, userData) =>
  api.put(`/users/${userId}`, userData);

export const fetchAppointments = async () => {
  try {
      const response = await api.get('/user/appointments'); // Adjust the endpoint based on your API
      return response; // Return the full response
  } catch (error) {
      throw new Error('Failed to fetch appointments'); // Handle the error as needed
  }
};