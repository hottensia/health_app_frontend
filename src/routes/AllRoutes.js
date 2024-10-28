import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePageList } from "../pages/HomePageList";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Profile } from "../pages/Profile"; 
import { OurStory } from "../pages/OurStory";
import { TherapistList } from "../pages/TherapistList";
import { Therapist } from "../pages/Therapist";
import { Blog } from "../pages/Blog";
import { Faqs } from "../pages/Faqs";
import { ContactUs } from "../pages/ContactUs";
import { PageNotFound } from "../pages/PageNotFound";
import { TherapistsList } from "../pages/TherapistsList";
import { PatientsList } from "../pages/PatientsList";
import { MoodEntriesList } from "../pages/MoodEntriesList";
import Appointments from "../pages/Appointments";
import { ForgotPassword } from "../pages/ForgotPassword";
import ChatPage from "../pages/ChatPage";  
import PrivateRoutes from "./PrivateRoutes";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageList />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="register" element={<Register />} />
      <Route path="our-story" element={<OurStory />} />
      <Route path="therapists" element={<TherapistList />} />
      <Route path="blog" element={<Blog />} />
      <Route path="faqs" element={<Faqs />} />
      <Route path="contact-us" element={<ContactUs />} />

      <Route element={<PrivateRoutes />}>
        <Route path="profile" element={<Profile />} />
        <Route path="my-patients" element={<PatientsList />} />
        <Route path="therapists/:id" element={<Therapist />} />
        <Route path="my-therapists" element={<TherapistsList />} />
        <Route path="mood-entries" element={<MoodEntriesList />} />
        <Route path="my-appointments" element={<Appointments />} />
        <Route path="chat/:appointmentId" element={<ChatPage />} />  
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
