import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="container-login">
      <div className="logo">
        <h1>Tattify</h1>
        <h2>For users:</h2>
        <p>Connect with artists</p>
        <p>Search for a location</p>
        <p>Leave a review</p>
        <h2>Are you an artist?</h2>
        <p> Show your work.</p>
        <p>Connect with users</p>
        <p>Stay recognizable</p>
      </div>
      <div className="login-form">
        <form className="form">
          <input type="email" placeholder="Enter your Email" required />
          <input type="password" placeholder="Enter your password" required />

          <a href="#" className="forgot-password">
            Forgot password?
          </a>
        </form>

        <button type="submit" id="login">
          Log In
        </button>
        <div className="divider"></div>
        <button type="button" className="create-account">
          Registration
        </button>
      </div>
    </div>
  );
}

export default Login;
