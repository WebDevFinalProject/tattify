import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { userId } = useParams(); // Extract userId from the URL params
  const [isValidUser, setIsValidUser] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Validate user on mount
  useEffect(() => {
    const validateUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/reset-password/${userId}`);
        if (response.status === 200) {
          setIsValidUser(true);  // User is valid
        }
      } catch (error) {
        setMessage(error.response?.data?.message || "Invalid user or error.");
      }
    };

    validateUser();
  }, [userId]); // Depend on userId

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/api/reset-password/${userId}`, { password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password.");
    }
  };

  return (
    <div>
      {isValidUser ? (
        <form onSubmit={handleSubmit}>
          <h2>Reset Your Password</h2>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      ) : (
        <p>{message}</p>  // Display error message if user is invalid
      )}
    </div>
  );
};

export default ResetPassword;



