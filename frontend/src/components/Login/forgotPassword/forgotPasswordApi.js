import axios from "axios";

const passwordApi = axios.create({
  baseURL: "http://localhost:4000", 
});

// Forgot Password API
export const forgotPassword = async (email) => {
  return passwordApi.post("/api/forgot-password", { email });
};

// Reset Password API
export const resetPassword = async (token, newPassword) => {
  return passwordApi.post(`/api/reset-password/:${token}`, { password: newPassword });
};

export default passwordApi;
