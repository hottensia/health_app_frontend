import api from "./api";

export const getNotifications = async (status = "UNREAD") => {
  console.log("Fetching notifications with status:", status);

  try {
    const response = await api.get(`/notifications`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    console.log("Notifications retrieved successfully:", response.data.notifications);
    return response.data.notifications; 
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error; 
  }
};

export const markNotificationAsRead = async (notificationId) => {
  console.log("Marking notification as read:", notificationId);

  try {
    const response = await api.patch(`/notifications/${notificationId}/mark_as_read`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    console.log("Notification marked as read:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error; 
  }
};
