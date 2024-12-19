import React, { useContext, useEffect, useState } from "react";
import "./ArtistForm.css";
import backgroundImage from "../../assets/ArtistForm/backgroundImage.png";
import api from "../api";
import { UserContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const ArtistForm = () => {
  const { loading } = useContext(UserContext);
  const { logout, user, setUser } = useContext(UserContext);
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

  useEffect(() => {
    const handlePopState = () => {
      if (!user?.isProfileComplete) {
        const confirmLeave = window.confirm(
          "Your profile is incomplete. Are you sure you want to go back?"
        );
        if (!confirmLeave) {
          // Prevent navigation
          navigate(1); // Go forward to prevent leaving
        } else {
          logout();
          navigate("/login");
        }
      }
    };

    // Add the event listener for the browser back button
    window.addEventListener("popstate", handlePopState);

    return () => {
      // Cleanup the event listener
      window.removeEventListener("popstate", handlePopState);
    };
  }, [user, logout]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field when user types
  };

  //Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("api/artists/create-profile", formData);

      if (response.status === 201) {
        alert("Artist profile created successfully!");
        navigate(`/artist-profile/${response.data.data.user._id}`);
        window.location.reload();
      } else {
        alert("Error creating artist profile.");
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
          className="formArtist-input"
          type="text"
          name="specialties"
          value={formData.specialties}
          onChange={handleChange}
          placeholder="e.g., Traditional, Minimalist, Abstract"
          required
        />

        <h2>Personal Information</h2>
        <p>
          Where are you based? This helps potential clients find you more
          easily.
        </p>
        <label className="artistForm-label" htmlFor="city">
          City: <span className="required">*</span>
        </label>
        <input
          className="formArtist-input"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
        />

        <label className="artistForm-label" htmlFor="country">
          Country: <span className="required">*</span>
        </label>
        <input
          className="formArtist-input"
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          required
        />

        <h2>Pricing Details</h2>
        <p>
          Provide details about your pricing so clients know what to expect for
          their next tattoo.
        </p>
        <label className="artistForm-label" htmlFor="basePrice">
          Base Price:
        </label>
        <input
          className="formArtist-input"
          type="number"
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
          Communicating in multiple languages can attract more clients. List the
          languages you speak!
        </p>
        <label className="artistForm-label" htmlFor="languagesSpoken">
          Languages Spoken:
        </label>
        <input
          className="formArtist-input "
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
  );
};

export default ArtistForm;
