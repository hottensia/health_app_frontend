import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth"; 
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [success, setSuccess] = useState("");
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

    try {
      const payload = {
        username: formData.username, 
        password: formData.password,
      };

      console.log("Logging in with payload:", payload);

      const response = await login(payload); 
      setSuccess("Login successful! Redirecting...");

      localStorage.setItem("token", response.data.access_token);
      
      const userData = {
        id: response.data.user.id,
        full_name: response.data.user.full_name,
        user_type: response.data.user.user_type,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      setAuthState({
        ...authState,
        isAuthenticated: true,
        user: userData,
      });

      toast.success("Successful Login");
      
      navigate("/therapists");

    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred during login. Please try again.";
      toast.error(errorMessage); 
      console.error(err); 
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {authState.error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{authState.error}</span>
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
          Log in to your account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username" 
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username" 
                type="text" 
                autoComplete="username" 
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={formData.username} 
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={authState.loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {authState.loading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <Link
            to="/forgot-password"
            className="w-full flex justify-center py-2 px-4 border border-green-600 rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-600 hover:text-white"
          >
            Forgot password?
          </Link>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Don't have an account?
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/register"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-gray-50"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
