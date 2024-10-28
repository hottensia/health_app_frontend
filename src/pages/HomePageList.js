import React from "react";
import { Link } from "react-router-dom";
import Image1 from "../assets/images/newbeginning.jpeg";
import Image2 from "../assets/images/ourmission.jpg";
import Image3 from "../assets/images/approach.jpg";
import Image4 from "../assets/images/getstarted.jpg";

export const HomePageList = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 dark:text-green-300 mb-4">
            Welcome to Niskize
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your journey to mental wellness starts here
          </p>
        </div>

        <div className="mb-16">
          <img
            src={Image1}
            alt="Mental Health Support"
            className="w-full h-[400px] object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img
              src={Image2}
              alt="Our Mission"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                At Niskize, we strive to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Provide accessible mental health support</li>
                <li>Foster a safe and empathetic community</li>
                <li>Promote mental health awareness</li>
                <li>Innovate in digital mental health tools</li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img
              src={Image3}
              alt="Our Approach"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">
                Our Approach
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We believe in a holistic approach to mental wellness:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Personalized therapy sessions</li>
                <li>Evidence-based treatment methods</li>
                <li>Continuous support and resources</li>
                <li>Integration of technology for better care</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={Image4}
                alt="Get Started"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-1/2">
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">
                Get Started
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Begin your journey to better mental health:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6">
                <li>Create an account</li>
                <li>Complete a brief assessment</li>
                <li>Get matched with a therapist</li>
                <li>Schedule your first session</li>
              </ul>
              <Link
                to="/register"
                className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition duration-300"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
