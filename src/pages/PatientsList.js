import React, { useState, useEffect } from "react";
import {
  getTherapistPatients,
  getPatientTherapists,
} from "../services/patients";

export const PatientsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");

    const userType = localStorage.getItem("user_type");
    const id = localStorage.getItem("userId");

    try {
      let response;

      if (userType === "PATIENT") {
        response = await getPatientTherapists(id);
        setData(response.therapists || []);
      } else {
        response = await getTherapistPatients(id);
        setData(response.patients || []);
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  if (data.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        No data found
      </div>
    );

  const userType = localStorage.getItem("user_type");

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
        My {userType === "PATIENT" ? "Therapists" : "Patients"}
      </h1>

      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="border border-gray-200 p-2">Name</th>
            <th className="border border-gray-200 p-2">Email</th>
            {userType === "THERAPIST" && (
              <th className="border border-gray-200 p-2">Status</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b bg-white">
              <td className="border border-gray-200 p-2">
                {item.first_name} {item.last_name}
              </td>
              <td className="border border-gray-200 p-2">{item.email}</td>
              {userType === "THERAPIST" && (
                <td className="border border-gray-200 p-2">{item.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
