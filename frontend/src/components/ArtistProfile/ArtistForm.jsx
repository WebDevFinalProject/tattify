import React, { useContext, useState } from "react";
import "./ArtistForm.css";
import backgroundImage from "../../assets/ArtistForm/backgroundImage.png";
import api from "../api";
import { UserContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const ArtistForm = () => {
  const { loading } = useContext(UserContext);
  const navigate = useNavigate();
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
  const [errors, setErrors] = useState({});

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field when user types
  };

  const validateForm = () => {
    const fields = [
      "specialties",
      "city",
      "country",
      "basePrice",
      "languagesSpoken",
      "bio",
    ];
    const newErrors = {};

    fields.forEach((field) => {
      if (!formData[field].trim())
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    try {
      const response = await api.post("api/artists/create-profile", formData);

      if (response.status === 201) {
        alert("Artist profile created successfully!");
        navigate("/login"); // Redirect to the login page after profile creation
      } else {
        alert(response.data.message || "Error creating artist profile.");
      }

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
    <section
      className="form-artist-create"
      style={{ "--background-image": `url(${backgroundImage})` }}
    >
      <form onSubmit={handleSubmit} className="fromArtist">
        <h1>Your Artistic Style and Expertise</h1>
        <p>
          Let clients know your unique tattooing styles and specialties. This is
          your chance to stand out!
        </p>
        <label className="artistForm-label" htmlFor="specialties">
          Styles: <span className="required">*</span>
        </label>
        <input
          className={`formArtist-input ${errors.specialties ? "error" : ""}`}
          type="text"
          name="specialties"
          value={formData.specialties}
          onChange={handleChange}
          placeholder="e.g., Traditional, Minimalist, Abstract"
        />
        {errors.specialties && (
          <p className="error-message">{errors.specialties}</p>
        )}

        <h2>Personal Information</h2>
        <p>
          Where are you based? This helps potential clients find you more
          easily.
        </p>
        <label className="artistForm-label" htmlFor="city">
          City: <span className="required">*</span>
        </label>
        <input
          className={`formArtist-input ${errors.city ? "error" : ""}`}
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
        />
        {errors.city && <p className="error-message">{errors.city}</p>}

        <label className="artistForm-label" htmlFor="country">
          Country: <span className="required">*</span>
        </label>
        <input
          className={`formArtist-input ${errors.country ? "error" : ""}`}
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
        />
        {errors.country && <p className="error-message">{errors.country}</p>}

        <h2>Pricing Details</h2>
        <p>
          Provide details about your pricing so clients know what to expect for
          their next tattoo.
        </p>
        <label className="artistForm-label" htmlFor="basePrice">
          Base Price: <span className="required">*</span>
        </label>
        <input
          className={`formArtist-input ${errors.basePrice ? "error" : ""}`}
          type="text"
          name="basePrice"
          value={formData.basePrice}
          onChange={handleChange}
          placeholder="e.g., $100/hour"
        />
        {errors.basePrice && (
          <p className="error-message">{errors.basePrice}</p>
        )}

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
          Communicating in multiple languages can attract more clients. List the
          languages you speak!
        </p>
        <label className="artistForm-label" htmlFor="languagesSpoken">
          Languages Spoken: <span className="required">*</span>
        </label>
        <input
          className={`formArtist-input ${
            errors.languagesSpoken ? "error" : ""
          }`}
          type="text"
          name="languagesSpoken"
          value={formData.languagesSpoken}
          onChange={handleChange}
          placeholder="e.g., English, Spanish, French"
        />
        {errors.languagesSpoken && (
          <p className="error-message">{errors.languagesSpoken}</p>
        )}

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
          Bio: <span className="required">*</span>
        </label>
        <input
          className={`bio-input ${errors.bio ? "error" : ""}`}
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Write a brief introduction about yourself"
        />
        {errors.bio && <p className="error-message">{errors.bio}</p>}

        <button type="submit" className="formArtist-button">
          Save
        </button>
      </form>
    </section>
  );
};

export default ArtistForm;
