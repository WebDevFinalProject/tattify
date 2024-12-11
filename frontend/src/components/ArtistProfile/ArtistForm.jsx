import React, { useState } from "react";
import "./ArtistForm.css";
import backgroundImage from "../../assets/ArtistForm/backgroundImage.png";

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
    <>
      <section
        className="form-artist-create"
        style={{ "--background-image": `url(${backgroundImage})` }}
      >
        <form onSubmit={handleSubmit} className="fromArtist">
          <h1>Your Artistic Style and Expertise</h1>
          <p>
            Let clients know your unique tattooing styles and specialties. This
            is your chance to stand out!
          </p>
          <label className="artistForm-label" htmlFor="specialties">
            Styles:
          </label>
          <input
            className="formArtist-input"
            type="text"
            name="specialties"
            value={formData.specialties}
            onChange={handleChange}
            placeholder="e.g., Traditional, Minimalist, Abstract"
          />

          <h2>Personal Information</h2>
          <p>
            Where are you based? This helps potential clients find you more
            easily.
          </p>
          <label className="artistForm-label" htmlFor="city">
            City:
          </label>
          <input
            className="formArtist-input"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
          />
          <label className="artistForm-label" htmlFor="country">
            Country:
          </label>
          <input
            className="formArtist-input"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
          />

          <h2>Pricing Details</h2>
          <p>
            Provide details about your pricing so clients know what to expect
            for their next tattoo.
          </p>
          <label className="artistForm-label" htmlFor="basePrice">
            Base Price:
          </label>
          <input
            className="formArtist-input"
            type="text"
            name="basePrice"
            value={formData.basePrice}
            onChange={handleChange}
            placeholder="e.g., $100/hour"
          />
          <label className="artistForm-label" htmlFor="studioLocation">
            Studio Location:
          </label>
          <input
            className="formArtist-input"
            type="text"
            name="studioLocation"
            value={formData.studioLocation}
            onChange={handleChange}
            placeholder="Studio Location"
          />
          <label className="artistForm-label" htmlFor="pricingDetails">
            Pricing Details:
          </label>
          <input
            className="formArtist-input"
            type="text"
            name="pricingDetails"
            value={formData.pricingDetails}
            onChange={handleChange}
            placeholder="e.g., Additional costs for large designs"
          />

          <h2>Languages You Speak</h2>
          <p>
            Communicating in multiple languages can attract more clients. List
            the languages you speak!
          </p>
          <label className="artistForm-label" htmlFor="languagesSpoken">
            Languages Spoken:
          </label>
          <input
            className="formArtist-input"
            type="text"
            name="languagesSpoken"
            value={formData.languagesSpoken}
            onChange={handleChange}
            placeholder="e.g., English, Spanish, French"
          />

          <h2>Social Media and Online Presence</h2>
          <p>
            Share your social media links to showcase your work and connect with
            clients.
          </p>
          <label className="artistForm-label" htmlFor="socialLinks">
            Social Links:
          </label>
          <input
            className="formArtist-input"
            type="text"
            name="socialLinks"
            value={formData.socialLinks}
            onChange={handleChange}
            placeholder="e.g., Instagram, Facebook"
          />

          <h2>About You</h2>
          <p>
            Add more information about yourself! Share your story and what
            inspires you as an artist.
          </p>
          <label className="artistForm-label" htmlFor="bio">
            Bio:
          </label>
          <input
            className="bio-input"
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write a brief introduction about yourself"
          />

          <button type="submit" className="formArtist-button">
            Save
          </button>
        </form>
      </section>
    </>
  );
};

export default ArtistForm;
