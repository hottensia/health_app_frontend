import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { AuthContext } from "../contexts/AuthContext";
import { Avatar, Badge } from "@mui/material";
import { getNotifications, markNotificationAsRead } from "../services/notificationService";

export const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);

  const handleLogout = () => {
    setDropdownOpen(false);
    setAuthState({
      isAuthenticated: false,
      user: {},
      loading: false,
      error: null,
    });
    localStorage.clear();
    navigate("/login");
  };

  const fetchNotifications = async () => {
    try {
      const fetchedNotifications = await getNotifications();
      setNotifications(fetchedNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleNotificationToggle = () => {
    setNotificationOpen((prev) => !prev);
    if (!notificationOpen) {
      fetchNotifications();
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== notificationId)
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const storedUsername = localStorage.getItem("username") || "Guest";
  const username = storedUsername.charAt(0).toUpperCase() + storedUsername.slice(1);
  const user = authState?.user || {};

  const isLoggedIn = Boolean(localStorage.getItem("access_token"));

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <nav className="max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-3">
            <img src={Logo} className="h-10" alt="Niskize Logo" />
            <span className="text-2xl font-semibold text-green-800 dark:text-white">
              Niskize
            </span>
          </NavLink>

          <div className="flex space-x-4 mt-4 md:mt-0">
            {authState?.isAuthenticated && user.user_type === "THERAPIST" && (
              <>
                <NavLink
                  to="/my-patients"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-white"
                >
                  My Patients
                </NavLink>
                <NavLink
                  to="/my-appointments"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-white"
                >
                  My Appointments
                </NavLink>
              </>
            )}

            {authState?.isAuthenticated && user.user_type === "PATIENT" && (
              <>
                <NavLink
                  to="/therapists"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-white"
                >
                  Therapists
                </NavLink>
                <NavLink
                  to="/my-appointments"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-white"
                >
                  My Appointments
                </NavLink>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={handleNotificationToggle}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-white"
                >
                  <span>Notifications</span>
                  <Badge
                    color="error"
                    badgeContent={notifications.length}
                    invisible={notifications.length === 0}
                  />
                </button>
                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-2 text-gray-700 dark:text-gray-300">
                        No new notifications
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="flex justify-between items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <span>{notification.message}</span>
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-xs text-white bg-green-600 hover:bg-green-700 p-1 rounded-md"
                            style={{ fontSize: "0.7rem" }}
                          >
                            Mark as Read
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="relative">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-white"
                  >
                    <Avatar alt={username} src={user.image_url || ""}>
                      {username[0]}
                    </Avatar>
                    <span>{username}</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        Profile
                      </NavLink>
                      <div className="border-t border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <NavLink to="/login">
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
                    Login
                  </button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
