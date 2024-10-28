import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getTherapistDetails } from "../services/therapists";
import { Mail, User, UserCheck } from "lucide-react";
import AppointmentForm from "../components/AppointmentForm";
import { AuthContext } from "../contexts/AuthContext";
import { Avatar } from "@mui/material";

const capitalizeName = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const Therapist = () => {
  const params = useParams();
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { authState } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => setShowForm(!showForm);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getTherapistDetails(params.id);
        setTherapist(response.data.user); 
      } catch (err) {
        setError("Failed to fetch profile");
        setTherapist(null); 
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [params.id]); 

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  
  if (!therapist) return <div className="flex justify-center items-center h-screen">No profile data found</div>;

  return (
    <div className="container mx-auto mt-10 p-5">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
        <div className="bg-green-700 text-white p-6 text-center">
          <h1 className="text-4xl font-bold">{capitalizeName(`${therapist.first_name} ${therapist.last_name}`)}</h1>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex gap-6 items-center">
            <Avatar
              alt={therapist.username} 
              src={therapist.image_url} 
              sx={{
                width: 120,
                height: 120,
                fontSize: "48px",
              }}
            >
              <p>{therapist.first_name?.[0]}</p>
              <p>{therapist.last_name?.[0]}</p>
            </Avatar>

            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <User className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-gray-700 font-semibold">Full Name:</span>
                <span className="ml-2">{capitalizeName(`${therapist.first_name} ${therapist.last_name}`)}</span>
              </div>
              <div className="flex items-center mb-4">
                <Mail className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-gray-700 font-semibold">Email:</span>
                <span className="ml-2">{therapist.email}</span>
              </div>
              <div className="flex items-center mb-4">
                <UserCheck className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-gray-700 font-semibold">User Type:</span>
                <span className="ml-2">{therapist.user_type}</span>
              </div>
            </div>
          </div>
          {authState.user.user_type && authState.user.user_type.toLowerCase() === "patient" && (
            <>
              <div className="flex items-center mb-4">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    therapist.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <span className="text-sm text-gray-600">
                  {therapist.status === "ACTIVE" ? "Active" : "Inactive"}
                </span>
              </div>
              {therapist.status === "ACTIVE" && authState?.isAuthenticated && (
                <div className="space-x-4">
                  <a
                    href={`mailto:${therapist.email}`}
                    className="inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                    aria-label={`Connect with ${capitalizeName(`${therapist.first_name} ${therapist.last_name}`)}`}
                  >
                    Connect
                  </a>
                  <button
                    onClick={handleShowForm}
                    className="inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                  >
                    Book Appointment
                  </button>
                </div>
              )}
              {showForm && <AppointmentForm />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Therapist;
