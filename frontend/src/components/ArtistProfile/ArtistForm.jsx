import React, { useState } from "react";
import axios from "axios";
import "./ArtistForm.css";

const ArtistForm = () => {
  const [formData, setFormData] = useState({
    bio: "",
    specialties: "",
    city: "",
    country: "",
    basePrice: "",
    certifications: "",
    languagesSpoken: "",
    studioLocation: "",
    pricingDetails: "",
    socialLinks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/artists/create-profile", formData);
      alert(response.data.message || "Profile created successfully!");
      setFormData({
        bio: "",
        specialties: "",
        city: "",
        country: "",
        basePrice: "",
        certifications: "",
        languagesSpoken: "",
        studioLocation: "",
        pricingDetails: "",
        socialLinks: "",
      });
    } catch (error) {
      console.error("Error creating profile:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fromArtist">
      <input
        type="text"
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Bio"
      />
      <input
        className="form-input"
        type="text"
        name="specialties"
        value={formData.specialties}
        onChange={handleChange}
        placeholder="Specialties"
      />
      <input
        className="form-input"
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
      />
      <input
        className="form-input"
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        placeholder="Country"
      />
      <input
        className="form-input"
        type="text"
        name="basePrice"
        value={formData.basePrice}
        onChange={handleChange}
        placeholder="Base Price"
      />
      <input
        className="form-input"
        type="text"
        name="certifications"
        value={formData.certifications}
        onChange={handleChange}
        placeholder="Certifications"
      />
      <input
        className="form-input"
        type="text"
        name="languagesSpoken"
        value={formData.languagesSpoken}
        onChange={handleChange}
        placeholder="Languages Spoken"
      />
      <input
        className="form-input"
        type="text"
        name="studioLocation"
        value={formData.studioLocation}
        onChange={handleChange}
        placeholder="Studio Location"
      />
      <input
        className="form-input"
        type="text"
        name="pricingDetails"
        value={formData.pricingDetails}
        onChange={handleChange}
        placeholder="Pricing Details"
      />
      <input
        className="form-input"
        type="text"
        name="socialLinks"
        value={formData.socialLinks}
        onChange={handleChange}
        placeholder="Social Links"
      />
      <button type="submit" className="form-button">
        Create Profile
      </button>
    </form>
  );
};

export default ArtistForm;
