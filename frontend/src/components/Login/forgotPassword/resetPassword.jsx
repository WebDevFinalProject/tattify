import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./resetPassword.css"; // Assuming your CSS file is named ResetPassword.css

const ResetPassword = () => {
  const { userId } = useParams(); // Extract userId from the URL params
  const navigate = useNavigate(); // Initialize navigate
  const [isValidUser, setIsValidUser] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Validate user on mount
  useEffect(() => {
    const validateUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/reset-password/${userId}`
        );
        if (response.status === 200) {
          setIsValidUser(true); // User is valid
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
      const response = await axios.post(
        `http://localhost:4000/api/reset-password/${userId}`,
        { password }
      );
      console.log(response.data.message);
      setMessage(response.data.message);

      // Set a timeout to navigate to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 1500); 
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password.");
    }
  };

  return (
    <div className="reset-password-body">
      <div className="reset-password-page">
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
            {message && <p className="success-message">{message}</p>}
          </form>
        ) : (
          <p className="error-message">{message}</p> // Display error message if user is invalid
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
