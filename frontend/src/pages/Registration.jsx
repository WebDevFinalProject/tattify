import React, { useState } from "react";
import "./registration.css";
import { Link } from "react-router-dom";
import axios from "axios";
import registrationApi from "../components/api";

const Registration = () => {
  const [role, setRole] = useState("customer");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    portfolio: null,
  });
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files || value }); // Update input or file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "portfolio" && role === "artist") {
        Array.from(formData.portfolio || []).forEach((file) =>
          formDataToSend.append(key, file)
        );
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
    formDataToSend.append("role", role);

    try {
      const res = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await res.json();
      setResponse(res.ok ? "Registration successful!" : data.error || data.msg);
      if (res.ok) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          portfolio: null,
        });
      }
    } catch {
      setResponse("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div id="registraion-div">
      <h1>Tattify</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        id="registration-form"
      >
        <h2>Create a new account</h2>
        <p id="intro-para">It's quick and easy!!</p>
        {/* Role Selection */}
        <div>
          {["customer", "artist"].map((r) => (
            <div key={r} id="role-selection">
              <input
                type="radio"
                name="role"
                value={r}
                checked={role === r}
                onChange={() => setRole(r)}
              />
              <label>{r.charAt(0).toUpperCase() + r.slice(1)}</label>
            </div>
          ))}
        </div>

        {/* Text Inputs */}
        {["firstName", "lastName", "email", "password"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            name={field}
            placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}*`}
            value={formData[field]}
            onChange={handleChange}
            required
          />
        ))}

        {/* Portfolio Upload for Artists */}
        {role === "artist" && (
          <div>
            <label>Upload Portfolio*:</label>
            <input
              type="file"
              name="portfolio"
              multiple
              onChange={handleChange}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={role === "artist" ? "artist-button" : "default-button"}
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
        <br />
        <p id={role === "artist" ? "artist-para" : "default-para"}>
          Do you already have an account? <Link to="/login" id="login-link">Login</Link>
        </p>
      </form>

      {response && <p id="response-para">{response}</p>}
    </div>
  );
};

export default Registration;
