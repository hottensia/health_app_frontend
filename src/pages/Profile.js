import React, { useEffect, useState } from "react";
import { getUserProfile } from "../services/auth"; // Import the service to fetch user data

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const fetchedUser = await getUserProfile(); // Fetch the user profile
        setUser(fetchedUser.user); // Extract the user object from the response
      } catch (error) {
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className="max-w-screen-md mx-auto p-4">
      {user ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-semibold mb-4">User Profile</h1>

          <h2 className="text-xl font-bold mb-2">{user.username || "User"}</h2>
          <div className="flex items-center mb-4">
            <img
              src={user.image_url || "https://via.placeholder.com/150"} 
              alt={`${user.username}'s avatar`}
              className="rounded-full h-24 w-24 mr-4"
            />
            <div>
              <p className="text-gray-700">
                <strong>Name:</strong> {user.first_name} {user.last_name}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-700">
                <strong>User Type:</strong> {user.user_type}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong> {user.status}
              </p>
              <p className="text-gray-700">
                <strong>Joined:</strong> {new Date(user.joined_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>No user data found.</div> 
      )}
    </div>
  );
};
