import { useState } from "react";


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
    setFormData({ ...formData, [name]: files || value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "portfolio" && role === "artist") {
        Array.from(formData.portfolio || []).forEach((file) =>
          formDataToSend.append(key, file)
        );
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    formDataToSend.append("role", role);

    try {
      const res = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await res.json();
      setResponse(res.ok ? "Registration successful!" : data.error || data.msg);
      if (res.ok) setFormData({ firstName: "", lastName: "", email: "", password: "",  portfolio: null });
    } catch {
      setResponse("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-body">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="role-selection">
          {["customer", "artist"].map((r) => (
            <label key={r}>
              <input
                type="radio"
                name="role"
                value={r}
                checked={role === r}
                onChange={(e) => setRole(e.target.value)}
              />
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </label>
          ))}
        </div>
        {["firstName", "lastName", "email", "password"].map((field) => (
          <input
            key={field}
            type={field.includes("password") ? "password" : "text"}
            name={field}
            placeholder={field.replace(/([A-Z])/g, " $1") + "*"}
            value={formData[field]}
            onChange={handleChange}
            required
          />
        ))}
        {role === "artist" && (
          <div className="portfolio-upload">
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
