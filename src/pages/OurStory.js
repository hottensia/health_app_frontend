import React from "react";
import { Link } from "react-router-dom";

export const OurStory = () => {
  return (
    <div className="bg-green-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
          Our Story
        </h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Team of mental health professionals"
            className="w-full h-64 object-cover"
          />

          <div className="p-6">
            <p className="text-gray-700 mb-4">
              {" "}
              Niskize, Swahili for "Listen to Me", was founded on a simple but
              powerful belief: everyone deserves to feel heard and have access
              to quality mental health support. Our journey began in 2024 when a
              group of enthusiastic software developers united around a shared
              vision — to break down the barriers to mental wellness by creating
              a space where people could find both guidance and a compassionate
              ear.{" "}
            </p>{" "}
            <p className="text-gray-700 mb-4">
              {" "}
              As we’ve seen the world become more digitally connected, we
              recognized a growing gap in accessible, user-friendly mental
              health resources. With this in mind, we set out to design a
              platform that bridges that gap — a place where those seeking
              support can find it quickly, safely, and without stigma, and where
              professionals are readily available to help.{" "}
            </p>{" "}
            <p className="text-gray-700 mb-4">
              {" "}
              Although Niskize is still in its early days, our mission remains
              clear: to offer a welcoming and effective path to mental wellness.
              As we prepare to launch, our commitment is to make sure that from
              the very first step, users feel heard, supported, and empowered.
              Niskize is more than a platform — it's a movement towards a world
              where mental health support is not only accessible but tailored to
              meet each person’s unique journey.{" "}
            </p>{" "}
            <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-4">
              Our Mission
            </h2>{" "}
            <p className="text-gray-700 mb-4">
              {" "}
              At Niskize, we are driven by the mission to elevate mental
              wellness for all. We strive to:{" "}
            </p>{" "}
            <ul className="list-disc list-inside text-gray-700 mb-4">
              {" "}
              <li>
                Provide accessible and professional mental health support to
                anyone in need
              </li>{" "}
              <li>
                Foster a safe, empathetic community where people can express
                themselves freely
              </li>{" "}
              <li>
                Promote mental health education and awareness, breaking down
                stigma
              </li>{" "}
              <li>
                Lead innovation in the world of digital mental health tools and
                resources
              </li>{" "}
            </ul>
            <div className="mt-8 text-center">
              <Link
                to="/therapists"
                className="inline-block bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300"
              >
                Connect with Our Therapists
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
