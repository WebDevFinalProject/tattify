import React, { useState } from "react";
import { forgotPassword } from "./forgotPasswordApi"; // Import the API call

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPassword(email);
      setMessage(response.data.msg); // Display success message
      setError(""); // Clear any previous errors
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong.");
      setMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className="forgot-password-page">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ForgotPassword;
