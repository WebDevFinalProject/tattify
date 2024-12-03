import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-page">
      <div className="container-login">
        <div className="logo">
          <h1>Tattify</h1>
          <h2>For users:</h2>
          <ul>
            <li>Connect with artists.</li>
            <li> Search for a location.</li>
            <li> Leave a review.</li>
          </ul>
          <h2>Are you an artist?</h2>
          <ul>
            <li> Show your work.</li>
            <li>Connect with users.</li>
            <li>Stay recognizable.</li>
          </ul>
        </div>
        <div className="login-form">
          <form className="form">
            <input type="email" placeholder="Enter your Email" required />
            <input type="password" placeholder="Enter your password" required />

            <a href="#" className="string">
              Forgot password?
            </a>
          </form>

          <button type="submit" id="login">
            Log In
          </button>
          <div className="divider"></div>
          <a href="#" className="string">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
