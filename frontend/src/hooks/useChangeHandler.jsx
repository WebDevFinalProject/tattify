import React, { useState } from "react";

const useChangeHandler = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "specialties" ||
      name === "certifications" ||
      name === "languagesSpoken" ||
      name === "socialLinks"
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(",").map((item) => item),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field when user types
  };

  return { formData, setFormData, errors, setErrors, handleChange };
};

export default useChangeHandler;
