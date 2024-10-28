import React, { useState, useEffect } from "react";
import { getUserTherapists } from "../services/therapists";
import { User, Mail, Phone } from "lucide-react";

const userId = localStorage.getItem("userId");

export const TherapistsList = () => {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await getUserTherapists(userId);
        setTherapists(response.data);
      } catch (err) {
        setError("Failed to fetch therapists");
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  if (therapists.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        No therapists assigned
      </div>
    );
  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
        My Therapists
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {therapists.map((therapist) => (
          <div
            key={therapist.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="bg-green-600 text-white p-4">
              <h2 className="text-xl font-semibold">{therapist.full_name}</h2>
            </div>
            <div className="p-4">
              <p className="flex items-center mb-2">
                <Mail className="h-5 w-5 text-green-600 mr-2" />
                {therapist.email}
              </p>
              <p className="flex items-center mb-2">
                <Phone className="h-5 w-5 text-green-600 mr-2" />
                {therapist.phone_number || "N/A"}
              </p>
              <p className="flex items-center">
                <User className="h-5 w-5 text-green-600 mr-2" />
                {therapist.specialization || "General"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
