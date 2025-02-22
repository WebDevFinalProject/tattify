import "./styles/main-info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";
import { useNavigate, useParams } from "react-router";
import { HiLocationMarker } from "react-icons/hi";
import useEditArtistProfile from "../../hooks/useEditArtistProfile";
import Chat from "../Chat/Chat.jsx";
import useStopScroll from "../../hooks/useStopScroll.jsx";
import { useEffect } from "react";

const MainInfo = ({ artist }) => {
  const { user, clickHandlerVisibility, isOpen } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const chatHandler = () => {
    if (!isOpen && !user) {
      navigate("/login");
    } else {
      clickHandlerVisibility();
    }
  };

  const {
    isEditing,
    setIsEditing,
    toggleEditMode,
    formData,
    setFormData,
    handleChange,
    toggleAvailability,
    handleSave,
  } = useEditArtistProfile();

  const isOwner = user && user?._id === id;
  useStopScroll(isEditing);

  // Capitalizing the first letter of words
  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Accessing and displaying data in edit data form
  useEffect(() => {
    if (user && isOwner) {
      setFormData({
        firstName: artist.firstName,
        lastName: artist.lastName,
        city: artist.city,
        country: artist.country,
        basePrice: artist.basePrice,
        experience: artist.experience,
        specialties: artist.specialties,
        languagesSpoken: artist.languagesSpoken,
        bio: artist.bio,
      });
    }
  }, []);

  return (
    <>
      <div className="artist-profile-main-info-container">
        <button className="star-button-phone">
          <FontAwesomeIcon icon={faStar} />
        </button>
        <img
          src={artist.profileImage}
          alt={`${artist.firstName} ${artist.lastName}`}
        />
        {/* Editable fields for name, city, country */}
        <div>
          {isOwner && isEditing && (
            <div className="overlay-edit">
              <div className="edit-artist-profile-form-container">
                <h2>Edit Information</h2>
                <form
                  className="edit-artist-profile-form"
                  onSubmit={handleSave}
                >
                  <div className="paired-inputs">
                    <div>
                      <label>First name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label>Last name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="paired-inputs">
                    <div>
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label>Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Country"
                      />
                    </div>
                  </div>
                  <div>
                    <label>Styles</label>
                    <input
                      type="text"
                      name="specialties"
                      value={formData.specialties}
                      onChange={handleChange}
                      placeholder="Styles"
                    />
                  </div>
                  <div>
                    <label>Languages</label>
                    <input
                      type="text"
                      name="languagesSpoken"
                      value={formData.languagesSpoken}
                      onChange={handleChange}
                      placeholder="Languages"
                    />
                  </div>
                  <div>
                    <label>Base price</label>
                    <input
                      type="number"
                      name="basePrice"
                      value={formData.basePrice}
                      onChange={handleChange}
                      placeholder="Base price"
                    />
                  </div>
                  <div>
                    <label>Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Experience"
                    />
                  </div>
                  <div>
                    <label>Bio</label>
                    <textarea
                      type="text"
                      name="bio"
                      rows={5}
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Bio"
                    />
                  </div>
                  <div className="button-container">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <h2>
            {capitalizeFirstLetter(artist.firstName)}{" "}
            {capitalizeFirstLetter(artist.lastName)}
          </h2>
          <p>
            <HiLocationMarker size={17} className="location-marker" />{" "}
            {artist.city}, {capitalizeFirstLetter(artist.country)}
          </p>
        </div>
        {/* Buttons for desktop */}
        <div className="button-container">
          <button className="star-button-desktop">
            <FontAwesomeIcon icon={faStar} size="3x" />
          </button>
          {isOwner && !isEditing && (
            <button className="edit-button-desktop" onClick={toggleEditMode}>
              <FontAwesomeIcon icon={faPenToSquare} size="3x" />
            </button>
          )}
          <button className="chat-button" onClick={chatHandler}>
            Chat
          </button>

          {/* Availability Slider */}
          {/*  <div className="availability-slider">
            <label className="switch">
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={toggleAvailability}
              />
              <span className="slider round"></span>
            </label>
            <span className="availability-label">
              {formData.isAvailable ? "Profile Active" : "Profile Inactive"}
            </span>
          </div>  */}
        </div>
      </div>
      {isOpen && user && <Chat />}
    </>
  );
};

export default MainInfo;
