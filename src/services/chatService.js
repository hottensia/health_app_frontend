import api from './api';

export const fetchMessages = async (appointmentId) => {
    try {
      const response = await api.get(`/chat/messages/appointment/${appointmentId}`);
      return response.data.messages; 
    } catch (error) {
      console.error('Failed to load messages:', error);
      throw error; 
    }
  };

export const sendMessage = async (recipientId, content, appointmentId) => {
  const newMessage = {
    recipient_id: recipientId,
    content,
    appointment_id: appointmentId,
  };
  try {
    const response = await api.post('/chat/messages', newMessage);
    return response.data.message; 
  } catch (error) {
    console.error('Failed to send message:', error);
    throw error; 
  }
};

export const replyMessage = async (originalMessageId, recipientId, content, appointmentId) => {
  const replyMessage = {
    original_message_id: originalMessageId,
    recipient_id: recipientId,
    content,
    appointment_id: appointmentId,
  };
  try {
    const response = await api.post('/chat/messages/reply', replyMessage);
    return response.data.message; 
  } catch (error) {
    console.error('Failed to send reply:', error);
    throw error; 
  }
};

export const completeChat = async (appointmentId) => {
  try {
    await api.post(`/chat/messages/${appointmentId}/complete`);
  } catch (error) {
    console.error('Failed to complete chat:', error);
    throw error; 
  }
};
export const fetchAppointmentStatus = async (appointmentId) => {
    try {
      const response = await api.get(`/appointments/${appointmentId}`);
      return response.data.status; 
    } catch (error) {
      console.error('Failed to fetch appointment status:', error);
      throw error; 
    }
  };
