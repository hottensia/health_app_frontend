import api from "./api";

export const register = (userData) => {
  const { username, email, password, first_name, last_name, user_type } = userData;

  console.log("Registering user with data:", {
    username,
    email,
    password,
    first_name,
    last_name,
    user_type,
  });

  return api.post("/register", { username, email, password, first_name, last_name, user_type });
};

export const login = async ({ username, password }) => {
  const payload = { username, password };
  console.log("Logging in with payload:", payload);

  try {
    const response = await api.post("/login", payload);

    const { user, access_token } = response.data;

    localStorage.setItem("username", user.username);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("status", user.status);
    localStorage.setItem("user_type", user.user_type);

    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; 
  }
};

export const logout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
  localStorage.removeItem("access_token");
  localStorage.removeItem("status");
  return api.post("/logout");
};

export const getUserProfile = async () => {
  const userId = localStorage.getItem("userId"); 

  if (!userId) {
    throw new Error("User ID not found in local storage."); 
  }

  try {
    console.log("Fetching user profile for ID:", userId);
    const response = await api.get(`/users/${userId}`);
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error; 
  }
};


export const checkAuthStatus = () => api.get("/check-auth");
