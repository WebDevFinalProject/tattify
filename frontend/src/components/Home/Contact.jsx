import React, { useState } from "react";
import "./styles/contact.css";

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
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.message);
        setFormData({ firstName: "", lastName: "", email: "", message: "" }); // Reset form
      } else {
        setResponse(data.error || "An error occurred");
      }
    } catch (error) {
      setResponse("An error occurred. Please try again.");
    }
  };

  return (
    <div className="contact-body">
      <div>
        <p>Got any questions?</p>
        <h1>Get in touch</h1>
      </div>
      <div className="vertical-line"></div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name*"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name*"
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
