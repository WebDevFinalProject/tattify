import React, { useState } from "react";
import { forgotPassword } from "./forgotPasswordApi"; // Import the API call
import "./forgotPassword.css";
import NavBar from "../../NavBar.jsx";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPassword(email);
      setMessage(response.data.message); // Display success message
      setError(""); // Clear any previous errors

      // Clear message after 5 seconds
      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
      setMessage(""); // Clear any previous success messages

      // Clear error after 5 seconds
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleCancel = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="forgot-password-body">
      <NavBar />
      <div className="forgot-password-page">
        <h1>Find Your Account</h1>
        <form onSubmit={handleSubmit}>
          <p> Please enter your email address </p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="forgot-password-button">
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit">Send</button>
          </div>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;

