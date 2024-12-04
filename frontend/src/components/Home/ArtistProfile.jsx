import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
function ArtistProfile() {
  const [profile, setProfile] = useState({
    email: "",
    firstName: "",
    lastName: "",
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
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    // If the user is logged in, populate profile from localStorage or API
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setProfile(JSON.parse(storedUser)); // If user data is stored, load it into state
    }
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  const generateProfileLink = () => {
    const baseName =
      profile.firstName && profile.firstName.trim() !== ""
        ? profile.firstName.toLowerCase().replace(/\s+/g, "")
        : "artist"; // Fallback if firstName is empty
    return `${baseName}.tattify.com`;
  };
  const handleSave = async () => {
    const {
      firstName,
      lastName,
      email,
      bio,
      specialties,
      city,
      country,
      basePrice,
      certifications,
      languagesSpoken,
      studioLocation,
      pricingDetails,
      socialLinks,
    } = profile;
    // Validate required fields
    if (!firstName || !lastName || !email || !bio) {
      setErrorMessage("Please fill out all required fields!");
      return;
    }
    try {
      const response = await axios.post("/artists/create-profile", profile, {
        withCredentials: true,
      });
      setSuccessMessage(
        response.data.message || "Profile was created successfully!"
      );
      setErrorMessage("");
      // Save profile to localStorage after successful save
      localStorage.setItem("user", JSON.stringify(profile));
      // Optionally clear form if needed
      setProfile({
        email: "",
        firstName: "",
        lastName: "",
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
      setTimeout(() => setSuccessMessage(""), 3000); // Auto-hide success message after 3 seconds
    } catch (error) {
      setSuccessMessage("");
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "An error has occurred."
        );
      } else {
        setErrorMessage("Network error, please try again later.");
      }
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    document.cookie = "jwt=; Max-Age=-99999999; path=/"; // Clear JWT cookie
    window.location.href = "/login"; // Redirect to login page
  };
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 p-3 bg-light">
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="img-fluid rounded-circle mb-3"
            />
            <h5>
              {`${profile.firstName} ${profile.lastName}` || "Tattoo Artist"}
            </h5>
            <p>
              My direct link: <br />
              <span>{generateProfileLink()}</span>
            </p>
            <button
              className="btn btn-outline-dark btn-sm mb-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <nav className="nav flex-column">
            <a className="nav-link active" href="#">
              MY PROFILE
            </a>
            <a className="nav-link" href="#">
              MY INQUIRIES
            </a>
            <a className="nav-link" href="#">
              STUDIOS & ARTISTS
            </a>
          </nav>
        </div>
        {/* Main Content */}
        <div className="col-md-9 p-5">
          <h2>My Portfolio</h2>
          <form>
            <h4>My Personal Information</h4>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">E-Mail Address *</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">First Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Bio *</label>
              <textarea
                className="form-control"
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Additional Fields */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Specialties</label>
                <input
                  type="text"
                  className="form-control"
                  name="specialties"
                  value={profile.specialties}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={profile.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* More Fields */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  value={profile.country}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Pricing Details</label>
                <input
                  type="text"
                  className="form-control"
                  name="pricingDetails"
                  value={profile.pricingDetails}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              SAVE
            </button>
          </form>
          {/* Messages */}
          {successMessage && (
            <div className="alert alert-success mt-3">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger mt-3">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ArtistProfile;
