import React, { useState } from "react";
import "./styles/contact.css";
import api from "../api";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/contact", formData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201) {
        setResponse(res.data.message);
        setFormData({ firstName: "", lastName: "", email: "", message: "" }); // Reset form
        setTimeout(() => setResponse(""), 2000);
      } else {
        setResponse(res.data.error || "An error occurred");
      }
    } catch (error) {
      setResponse("An error occurred. Please try again.");
      setTimeout(() => setResponse(""), 2000);
    }
  };

  return (
    <div className="contact-body" id="contact-form">
      <div>
        <p>Got any questions?</p>
        <h1>Get in touch</h1>
      </div>
      <div className="vertical-line"></div>
      <form onSubmit={handleSubmit} className="hero-contact-form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name *"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name *"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Type your message here..."
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Send</button>
      </form>

      {response && <p>{response}</p>}
    </div>
  );
};

export default Contact;
