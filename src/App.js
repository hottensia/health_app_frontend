import React from "react";
import { AllRoutes } from "./routes/AllRoutes";
import { Header, Footer } from "./components";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { AppointmentProvider } from "./contexts/AppointmentContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppointmentProvider>
          <div className="App bg-white dark:bg-gray-900 min-h-screen">
            <Header />
            <AllRoutes />
            <Footer />
          </div>
          <Toaster />
        </AppointmentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
