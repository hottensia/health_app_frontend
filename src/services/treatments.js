// services/treatments.js
import api from "./api";

export const getTreatments = () => api.get("/treatments");

export const createTreatment = (treatmentData) =>
  api.post("/treatments", treatmentData);

export const getTreatmentDetails = (treatmentId) =>
  api.get(`/treatments/${treatmentId}`);

export const updateTreatment = (treatmentId, treatmentData) =>
  api.put(`/treatments/${treatmentId}`, treatmentData);

export const deleteTreatment = (treatmentId) =>
  api.delete(`/treatments/${treatmentId}`);

export const restoreTreatment = (treatmentId) =>
  api.post(`/treatments/${treatmentId}/restore`);
