import "./styles/main-info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";
import { useParams } from "react-router";
import { HiLocationMarker } from "react-icons/hi";

const MainInfo = ({
    artist,
    isEditing,
    setIsEditing,
    handleSave,
    formData,
    handleInputChange,
    toggleEditMode,
}) => {
    const { user } = useContext(UserContext);
    const { id } = useParams();

    const isOwner = user && user?._id === id;

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
                        <>
                            <div className="overlay">
                                <div className="edit-artist-profile-form-container">
                                    <h2>Edit Information</h2>
                                    <form
                                        className="edit-artist-profile-form"
                                        onSubmit={handleSave}
                                    >
                                        <div className="paired-inputs">
                                            <div>
                                                <label htmlFor="">
                                                    First name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    placeholder="First Name"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="">
                                                    Last name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    placeholder="Last Name"
                                                />
                                            </div>
                                        </div>
                                        <div className="paired-inputs">
                                            <div>
                                                <label htmlFor="">City</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    placeholder="City"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="">
                                                    Country
                                                </label>
                                                <input
                                                    type="text"
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    placeholder="Country"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="">Styles</label>
                                            <input
                                                type="text"
                                                name="specialties"
                                                value={formData.specialties}
                                                onChange={handleInputChange}
                                                placeholder="Styles"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="">Languages</label>
                                            <input
                                                type="text"
                                                name="languagesSpoken"
                                                value={formData.languagesSpoken}
                                                onChange={handleInputChange}
                                                placeholder="Languages"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="">Base price</label>
                                            <input
                                                type="text"
                                                name="basePrice"
                                                value={formData.basePrice}
                                                onChange={handleInputChange}
                                                placeholder="Base price"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="">Experience</label>
                                            <input
                                                type="text"
                                                name="experience"
                                                value={formData.experience}
                                                onChange={handleInputChange}
                                                placeholder="Experience"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="">Bio</label>
                                            <textarea
                                                type="text"
                                                name="bio"
                                                rows={5}
                                                value={formData.bio}
                                                onChange={handleInputChange}
                                                placeholder="Bio"
                                            />
                                        </div>
                                        <div className="button-container">
                                            <button>Submit</button>
                                            <button
                                                onClick={() =>
                                                    setIsEditing(false)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                    )}

                    <h2>
                        {artist.firstName} {artist.lastName}
                    </h2>
                    <p>
                        <HiLocationMarker size={15} /> {artist.city},{" "}
                        {artist.country}
                    </p>
                </div>
                {/* Buttons for desktop */}
                <div className="button-container">
                    <button className="star-button-desktop">
                        <FontAwesomeIcon icon={faStar} size="3x" />
                    </button>
                    {isOwner && !isEditing && (
                        <button
                            className="edit-button-desktop"
                            onClick={toggleEditMode}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} size="3x" />
                        </button>
                    )}
                    <button className="chat-button">Chat</button>
                </div>
            </div>
        </>
    );
};

export default MainInfo;
