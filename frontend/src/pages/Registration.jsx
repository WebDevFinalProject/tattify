import React, { useState } from "react";

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

  

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Role Selection */}
        <div>
          {["customer", "artist"].map((r) => (
            <label key={r}>
              <input
                type="radio"
                name="role"
                value={r}
                checked={role === r}
                onChange={() => setRole(r)}
              />
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </label>
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
            <input type="file" name="portfolio" multiple onChange={handleChange} />
          </div>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>

      {response && <p>{response}</p>}
    </div>
  );
};

export default Registration;