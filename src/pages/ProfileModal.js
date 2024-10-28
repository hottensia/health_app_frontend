// ProfileModal.js
import React from "react";
import { Modal } from "@mui/material";

const ProfileModal = ({ open, onClose, user }) => {
  if (!user) return null; // Prevent rendering if user is not available

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col bg-white dark:bg-gray-900 rounded-lg p-4 shadow-lg max-w-sm mx-auto mt-20">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">User Profile</h2>
        <div className="mt-4">
          <img src={user.image_url || "default-image-url.png"} alt={user.username || "User"} className="rounded-full h-24 w-24 mx-auto" />
          <p className="mt-2 text-center text-gray-700 dark:text-gray-300">Username: {user.username || "N/A"}</p>
          <p className="text-center text-gray-700 dark:text-gray-300">Email: {user.email || "N/A"}</p>
          <p className="text-center text-gray-700 dark:text-gray-300">First Name: {user.first_name || "N/A"}</p>
          <p className="text-center text-gray-700 dark:text-gray-300">Last Name: {user.last_name || "N/A"}</p>
          <p className="text-center text-gray-700 dark:text-gray-300">User Type: {user.user_type || "N/A"}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
