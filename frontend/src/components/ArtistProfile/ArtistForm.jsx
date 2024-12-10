import React, { useState } from "react";
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
      const response = await api.post("/artists/create-profile", formData);
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
    <section className="form-artist-create">
      <form onSubmit={handleSubmit} className="fromArtist">
        <label htmlFor="specialties">Styles:</label>
        <input
          className="form-input"
          type="text"
          name="specialties"
          value={formData.specialties}
          onChange={handleChange}
          placeholder="Styles"
        />
        <label htmlFor="city">City:</label>
        <input
          className="form-input"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
        />
        <label htmlFor="country">Country:</label>
        <input
          className="form-input"
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
        />
        <label htmlFor="basePrice">Base Price:</label>
        <input
          className="form-input"
          type="text"
          name="basePrice"
          value={formData.basePrice}
          onChange={handleChange}
          placeholder="Base Price"
        />
        <label htmlFor="certifications">Certifications:</label>
        <input
          className="form-input"
          type="text"
          name="certifications"
          value={formData.certifications}
          onChange={handleChange}
          placeholder="Certifications"
        />
        <label htmlFor="languagesSpoken">Languages Spoken:</label>
        <input
          className="form-input"
          type="text"
          name="languagesSpoken"
          value={formData.languagesSpoken}
          onChange={handleChange}
          placeholder="Languages Spoken"
        />
        <label htmlFor="studioLocation">Studio Location:</label>
        <input
          className="form-input"
          type="text"
          name="studioLocation"
          value={formData.studioLocation}
          onChange={handleChange}
          placeholder="Studio Location"
        />
        <label htmlFor="pricingDetails">Pricing Details:</label>
        <input
          className="form-input"
          type="text"
          name="pricingDetails"
          value={formData.pricingDetails}
          onChange={handleChange}
          placeholder="Pricing Details"
        />
        <label htmlFor="socialLinks">Social Links:</label>
        <input
          className="form-input"
          type="text"
          name="socialLinks"
          value={formData.socialLinks}
          onChange={handleChange}
          placeholder="Social Links"
        />
        <label htmlFor="bio">Bio:</label>
        <input
          className="bio-input"
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
        />
        <button type="submit" className="form-button">
          Save
        </button>
      </form>
    </section>
  );
};

export default ArtistForm;
