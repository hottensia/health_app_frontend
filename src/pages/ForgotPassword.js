import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile, login } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

export const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      //TODO: add reset password endpoint and link to it
      //   const response = await login(formData);
      setSuccess("Password reset successfully...");
      // Add this line
      navigate("/login");
    } catch (err) {
      console.error("Password reset error:", err);
      setError(
        err.response?.data?.message || "An error occurred during password reset"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen ">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-4 h-full">
        <div className="grid grid-cols-1 px-4 lg:grid-cols-2 h-full items-center gap-8">
          <div className="hidden lg:block bg-hero-bg bg-no-repeat bg-cover bg-center h-full "></div>
          <div className="mx-auto sm:mx-auto lg:w-3/4 w-full ">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              {success && (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                  role="alert"
                >
                  <span className="block sm:inline">{success}</span>
                </div>
              )}
              <h2 className="my-6 text-center text-3xl font-medium text-gray-900">
                Reset Your Password
              </h2>
              <div className=" p-2 bg-green-200 rounded-md mb-4">
                <p>
                  To request for a password reset, please enter the same email
                  address you created an account with.
                </p>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email address"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {isLoading
                      ? "Requesting password reset"
                      : "Request Password Reset"}
                  </button>
                </div>
              </form>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Remembered your password?
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to="/login"
                    className="w-full flex justify-center py-2 px-4 border border-green-600 rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-600 hover:text-white "
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
