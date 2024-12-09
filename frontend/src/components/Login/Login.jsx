import React, { useContext, useState } from "react";
import axios from "axios";
import "./Login.css";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/ContextProvider";
import NavBar from "../NavBar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/api/login",
        { email, password },
        { withCredentials: true } // Ensures cookies are sent with the request
      );

      const { role, ...userData } = response.data.user;
      login(userData);

      if (role === "artist") {
        // Redirect to artist profile setup
        navigate("/artist-profile");
      } else if (role === "customer") {
        // Redirect to dashboard
        navigate("/");
      } else {
        setErrorMessage("Unknown role. Please contact support.");
      }
    } catch (error) {
      if (error.response) {
        // Handle response error (e.g., bad credentials)
        setErrorMessage(error.response.data.msg || "Login failed!");
      } else {
        // Handle network or server errors
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="login-page">
        <div className="container-login">
          <div className="logo">
            <h1>Tattify</h1>
            <h2>For users:</h2>
            <ul>
              <li>Connect with artists.</li>
              <li>Search for a location.</li>
              <li>Leave a review.</li>
            </ul>
            <h2>Are you an artist?</h2>
            <ul>
              <li>Show your work.</li>
              <li>Connect with users.</li>
              <li>Stay recognizable.</li>
            </ul>
          </div>
          <div className="login-form">
            <form className="form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <a href="#" className="string">
                Forgot password?
              </a>
              <a href="/register" className="string">
                Create an account? <span>Register</span>
              </a>
              <button type="submit" id="login">
                Log In
              </button>
            </form>
            <div className="divider"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
