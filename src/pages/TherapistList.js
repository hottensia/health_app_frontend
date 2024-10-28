import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTherapists } from "../services/therapists"; 
import { AuthContext } from "../contexts/AuthContext";

const TherapistCard = ({ therapist }) => {
  const { authState } = useContext(AuthContext);

  const isActive = therapist.status === "ACTIVE";

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        {therapist.image_url ? (
          <img
            src={therapist.image_url}
            alt={`${therapist.first_name} ${therapist.last_name}`} 
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          {therapist.first_name} {therapist.last_name} 
        </h2>
        <p className="text-xs text-gray-600 mb-2">{therapist.email}</p> 
        {authState.user.user_type && authState.user.user_type.toLowerCase() === "patient" && (
          <>
            <div className="flex items-center mb-2">
              <span
                className={`inline-block w-3 h-3 rounded-full mr-2 ${
                  isActive ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <span className="text-xs text-gray-600">
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
            {isActive && (
              <a
                href={`mailto:${therapist.email}`}
                className="inline-block bg-green-500 text-white text-xs py-1 px-3 rounded hover:bg-green-600 transition duration-300 mr-2"
                aria-label={`Connect with ${therapist.first_name} ${therapist.last_name}`}
              >
                Connect
              </a>
            )}
            <Link
              to={`/therapists/${therapist.id}`}
              className="inline-block bg-green-500 text-white text-xs py-1 px-3 rounded hover:bg-green-600 transition duration-300"
              aria-label={`View profile of ${therapist.first_name} ${therapist.last_name}`}
            >
              View Profile
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export const TherapistList = () => {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await getTherapists();
        setTherapists(response.data.therapists);
        console.log("Fetched therapists:", response.data.therapists); 
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
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  if (therapists.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-lg text-gray-600">
        <p>No therapists assigned.</p>
        <p className="mt-4 text-center">
          Please check back later or explore our <Link to="/" className="text-green-500 underline">services</Link> for other options.
        </p>
      </div>
    );

  return (
    <div className="bg-green-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Therapists
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {therapists.map((therapist) => (
            <TherapistCard key={therapist.id} therapist={therapist} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/our-story"
            className="inline-block bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </div>
  );
};
