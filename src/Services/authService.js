import API from "../api/todoApi";

// Register user
export const register = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

// Login user
export const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);

  // Save token + user
  const token = response.data.token;
  const user = response.data.user;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get current token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Get current user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Check if logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};