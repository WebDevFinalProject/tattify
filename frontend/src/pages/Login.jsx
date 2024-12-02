import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="container-login">
      <div className="logo">
        <h1>Tattify</h1>
        <p>Connect with artists</p>
        <p>Are you an artist? Show your work.</p>
      </div>
      <div className="login-form">
        <form className="form">
          <input type="email" placeholder="Enter your Email" required />
          <input type="password" placeholder="Enter your password" required />

          <button type="submit" className="login">
            Log In
          </button>

          <a href="#" className="forgot-password">
            Forgot password?
          </a>

          <div className="divider"></div>

          <h2 className="register-heading">Don't have an account?</h2>
          <button type="button" className="create-account">
            Create New Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
