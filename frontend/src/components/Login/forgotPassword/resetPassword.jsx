import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "./forgotPasswordApi"; // Import the API call

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams(); // Get the token from the URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await resetPassword(token, password);
      setMessage(response.data.msg); // Display success message
      setError(""); // Clear any previous errors
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong.");
      setMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className="reset-password-page">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ResetPassword;
