import React, { useContext, useState } from "react";
import { bookAppointment } from "../services/appointments"; 
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "./spinner/Spinner";

const AppointmentForm = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [duration, setDuration] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formattedDateTime = new Date(`${date}T${time}:00`);
    const formattedData = {
      date: formattedDateTime.toISOString().split('T')[0],
      time: formattedDateTime.toTimeString().split(' ')[0],
      duration,
      notes,
      patient_id: localStorage.getItem("userId"),
      therapist_id: id,
    };
    
    console.log("Formatted appointment data being sent:", formattedData);

    bookAppointment(formattedData)
      .then((response) => {
        console.log("Appointment booking response:", response.data);
        toast.success(response.data.message); 
        navigate("/my-appointments");
      })
      .catch((err) => {
        console.log("Error while booking appointment:", err.response);
        toast.error("Couldn't book appointment, please try again");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      className="p-4 rounded-md mt-4 border-gray-300 border-[1px] space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label htmlFor="appointment">Select an appointment date</label>
        <input
          min={new Date().toISOString().split('T')[0]}
          className="border-gray-300 border-[1px] p-2 rounded-md"
          name="appointment"
          value={date}
          type="date"
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="time">Select a time (HH:MM)</label>
        <input
          className="border-gray-300 border-[1px] p-2 rounded-md"
          name="time"
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="notes">Notes</label>
        <textarea
          className="border-gray-300 border-[1px] p-2 rounded-md"
          name="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </div>
      <button className="inline-block bg-green-500 w-full text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
        {isLoading ? <Spinner /> : "Schedule Appointment"}
      </button>
    </form>
  );
};

export default AppointmentForm;
