import React, { useContext, useState } from "react";
import "./Login.css";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
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
      const response = await api.post("/api/login", { email, password });

      const { isProfileComplete, role, ...userData } = response.data.user;
      login({ ...userData, role });

      if (role === "artist" && !isProfileComplete) {
        navigate("/artist/create-profile/");
      } else if (role === "customer") {
        navigate("/customer-profile");
      } else {
        navigate(`/artist-profile/${userData._id}`);
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
        <div className="test-login-info">
          <h3>Test Account Information</h3>
          <ul>
            <li>Customer</li>
            <ul>
              <li>
                Email : <span>diana.lee@example.com</span>
              </li>
              <li>
                Password : <span>DianaPass2024!</span>
              </li>
            </ul>
            <li>Artist</li>
            <ul>
              <li>
                Email : <span>liam.clark@example.com</span>
              </li>
              <li>
                Password : <span>P@ssw0rd123</span>
              </li>
            </ul>
          </ul>
        </div>
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
            <form className="login-container" onSubmit={handleSubmit}>
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
              <a href="/forgot-password" className="string">
                Forgot password?
              </a>
              <Link to="/register" className="string">
                Create an account? <span>Register</span>
              </Link>
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
