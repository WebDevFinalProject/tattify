import React, { useState, useRef } from "react";
import "./registration.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import NavBar from "../NavBar";

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

  const navigate = useNavigate();

  // Ref for file input
  const fileInputRef = useRef(null);

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
      const res = await api.post("/api/signup", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResponse(
        res.status === 201
          ? "Registration successful!"
          : res.data.error || res.data.msg
      );
      if (res.status === 201) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          portfolio: null,
        });
        // Clear file input field
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        // Make the response disappear after 3 seconds
        setTimeout(() => setResponse(""), 2000);
      }

      if (role === "artist") {
        // Redirect to artist profile setup
        navigate(`/artist/create-profile`);
      } else {
        navigate("/login");
      }
    } catch {
      setResponse("An error occurred. Please try again.");
      setTimeout(() => setResponse(""), 2000);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <NavBar />
      <div id="registraion-div">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          id="registration-form"
        >
          <h2>Create a new account</h2>
          <p id="intro-para">It's quick and easy!!</p>
          {/* Role Selection */}
          <div className="reg-role-select">
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
            <div className="registration-portfolio">
              <label>Upload Portfolio*:</label>
              <input
                className="reg-input-file"
                type="file"
                name="portfolio"
                multiple
                onChange={handleChange}
                ref={fileInputRef} // Attach ref to file input
              />
            </div>
          )}

          <div className="reg-submission">
            <button
              type="submit"
              disabled={isSubmitting}
              className={role === "artist" ? "artist-button" : "default-button"}
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
            <br />
            <p id={role === "artist" ? "artist-para" : "default-para"}>
              Do you already have an account?{" "}
              <Link to="/login" id="login-link">
                Login
              </Link>
            </p>
          </div>
        </form>

        {response && <p id="response-para">{response}</p>}
      </div>
    </>
  );
};

export default Registration;
