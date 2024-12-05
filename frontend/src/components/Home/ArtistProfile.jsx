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
    images: [],
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch initial data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setProfile({
        ...parsedUser,
        images: parsedUser.images || [], // Ensure `images` is always an array
      });
    }
  }, []);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProfile((prevProfile) => ({
      ...prevProfile,
      images: [...(prevProfile.images || []), ...files],
    }));
  };

  // Remove an uploaded image
  const removeImage = (index) => {
    setProfile((prevProfile) => {
      const updatedImages = [...prevProfile.images];
      updatedImages.splice(index, 1);
      return { ...prevProfile, images: updatedImages };
    });
  };

  // Save profile data
  const handleSave = async () => {
    const { firstName, lastName, email, bio } = profile;
    if (!firstName || !lastName || !email || !bio) {
      setErrorMessage("Please fill out all required fields!");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(profile).forEach((key) => {
        if (key === "images") {
          profile.images.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
          });
        } else {
          formData.append(key, profile[key]);
        }
      });

      const response = await axios.post("/artists/create-profile", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage(
        response.data.message || "Profile updated successfully!"
      );
      setErrorMessage("");
      localStorage.setItem("user", JSON.stringify(profile));
      setIsEditMode(false); // Switch back to view mode
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    document.cookie = "jwt=; Max-Age=-99999999; path=/";
    window.location.href = "/login";
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
              <span>{`${
                profile.firstName?.toLowerCase() || "artist"
              }.tattify.com`}</span>
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
          <h2>{isEditMode ? "Edit Portfolio" : "My Portfolio"}</h2>
          {isEditMode ? (
            <form>
              {Object.keys(profile).map((key) =>
                key === "images" ? (
                  <div className="mb-3" key={key}>
                    <label className="form-label">Upload Images</label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      onChange={handleImageUpload}
                    />
                    <div className="mt-2">
                      {profile.images.map((file, index) => (
                        <div
                          key={index}
                          className="d-inline-block position-relative me-2"
                        >
                          <img
                            src={
                              file instanceof File
                                ? URL.createObjectURL(file)
                                : file
                            }
                            alt={`Preview ${index}`}
                            className="img-thumbnail"
                            style={{ width: "100px", height: "100px" }}
                          />
                          <button
                            type="button"
                            className="btn-close position-absolute top-0 end-0"
                            onClick={() => removeImage(index)}
                          ></button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mb-3" key={key}>
                    <label className="form-label">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name={key}
                      value={profile[key]}
                      onChange={handleInputChange}
                    />
                  </div>
                )
              )}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                SAVE
              </button>
            </form>
          ) : (
            <div>
              <h4>Personal Information</h4>
              <p>
                <strong>Name:</strong>{" "}
                {`${profile.firstName} ${profile.lastName}`}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Bio:</strong> {profile.bio}
              </p>
              <p>
                <strong>Specialties:</strong> {profile.specialties}
              </p>
              <p>
                <strong>City:</strong> {profile.city}
              </p>
              <p>
                <strong>Country:</strong> {profile.country}
              </p>
              <p>
                <strong>Languages Spoken:</strong> {profile.languagesSpoken}
              </p>

              <h4>Portfolio Images</h4>
              <div className="mt-2">
                {profile.images.length > 0 ? (
                  profile.images.map((file, index) => (
                    <img
                      key={index}
                      src={
                        file instanceof File ? URL.createObjectURL(file) : file
                      }
                      alt={`Portfolio ${index}`}
                      className="img-thumbnail me-2"
                      style={{ width: "150px", height: "150px" }}
                    />
                  ))
                ) : (
                  <p>No images uploaded yet.</p>
                )}
              </div>
              <button
                className="btn btn-secondary mt-3"
                onClick={() => setIsEditMode(true)}
              >
                EDIT PORTFOLIO
              </button>
            </div>
          )}
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
