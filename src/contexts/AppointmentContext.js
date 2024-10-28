import { createContext, useState } from "react";

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  return (
    <AppointmentContext.Provider value={{ appointments, setAppointments }}>
      {children}
    </AppointmentContext.Provider>
  );
};
