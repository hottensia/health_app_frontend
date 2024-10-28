import React from "react";
import { Calendar, Clock, StethoscopeIcon } from "lucide-react";

const Appointment = ({ appointment }) => {
  return (
    <div className="p-4 rounded-md shadow-xl border-2  text-black space-y-2">
      <div className=" flex justify-between">
        <div className=" flex space-x-2">
          <Clock />
          <p>{appointment.duration} mins</p>
        </div>
        <div className=" flex space-x-2">
          <Calendar />
          <p>{new Date(appointment.date_time).toLocaleDateString()}</p>
        </div>
        <div className=" flex space-x-2">
          <StethoscopeIcon />
          <p>{appointment.therapist.name}</p>
        </div>
        <div className=" flex space-x-2">
          <p
            className={`${
              appointment.status.toLowerCase() === "scheduled"
                ? "text-green-700"
                : ""
            }`}
          >
            {appointment.status}
          </p>
        </div>
      </div>
      <div className="">{appointment.notes}</div>
    </div>
  );
};

export default Appointment;
