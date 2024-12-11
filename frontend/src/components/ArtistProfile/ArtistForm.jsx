import React, { useContext, useState } from "react";
import "./ArtistForm.css";
import { useNavigate } from "react-router-dom";
import api from "../api";
import backgroundImage from "../../assets/ArtistForm/backgroundImage.png";
import { UserContext } from "../../context/ContextProvider.jsx";

const ArtistForm = () => {
  const { user, logout, error } = useContext(UserContext);
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
  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate("/login");
  }
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form data
  const validateForm = () => {
    const validationErrors = {};
    const requiredFields = [
      "specialties",
      "city",
      "country",
      "basePrice",
      "bio",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        validationErrors[field] = "This field is required.";
      }
    });

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Display validation errors
      alert("You have to fill all fields marked with a red star!");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/artists/create-profile", formData, {
        withCredentials: true,
      });

      alert(response.data.message || "Profile updated successfully!");

      navigate("/artist-profile");
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
      console.error("Error updating profile:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
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
            Styles:<span className="required">*</span>:
          </label>
          <input
            className="formArtist-input"
            type="text"
            name="specialties"
            value={formData.specialties}
            onChange={handleChange}
            placeholder="e.g., Traditional, Minimalist, Abstract"
          />
          {errors.specialties && (
            <p className="error-text">{errors.specialties}</p>
          )}

          <h2>Personal Information</h2>
          <p>
            Where are you based? This helps potential clients find you more
            easily.
          </p>
          <label className="artistForm-label" htmlFor="city">
            City:<span className="required">*</span>:
          </label>
          <input
            className="formArtist-input"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
          />
          {errors.city && <p className="error-text">{errors.city}</p>}

          <label className="artistForm-label" htmlFor="country">
            Country:<span className="required">*</span>:
          </label>
          <input
            className="formArtist-input"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
          />
          {errors.country && <p className="error-text">{errors.country}</p>}

          <h2>Pricing Details</h2>
          <p>
            Provide details about your pricing so clients know what to expect
            for their next tattoo.
          </p>
          <label className="artistForm-label" htmlFor="basePrice">
            Base Price:<span className="required">*</span>:
          </label>
          <input
            className="formArtist-input"
            type="text"
            name="basePrice"
            value={formData.basePrice}
            onChange={handleChange}
            placeholder="e.g., $100/hour"
          />
          {errors.basePrice && <p className="error-text">{errors.basePrice}</p>}

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

          <h2>About You</h2>
          <label className="artistForm-label" htmlFor="bio">
            Bio:<span className="required">*</span>:
          </label>
          <input
            className="bio-input"
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write a brief introduction about yourself"
          />
          {errors.bio && <p className="error-text">{errors.bio}</p>}

          <button
            type="submit"
            className="formArtist-button"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </section>
    </>
  );
};

export default ArtistForm;
