import "./styles/main-info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";

const MainInfo = ({
    artist,
    isEditing,
    setIsEditing,
    handleSave,
    formData,
    handleInputChange,
}) => {
    const { user } = useContext(UserContext);
    const isOwner = user && user?._id === artist?._id;

    // Toggle edit mode
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <>
     
                <div className="artist-profile-main-info-container">
                    <button className="star-button-phone">
                        <FontAwesomeIcon icon={faStar} />
                    </button>
                    <img src={artist.profileImage} alt="" />

                    {/* Editable fields for name, city, country */}
                    <div>
                        {isEditing ? (
                            <form className="edit-artist-profile-form">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName || ""}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName || ""}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                />
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city || ""}
                                    onChange={handleInputChange}
                                    placeholder="City"
                                />
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country || ""}
                                    onChange={handleInputChange}
                                    placeholder="Country"
                                />
                            </form>
                        ) : (
                            <>
                                <h2>
                                    {artist.firstName} {artist.lastName}
                                </h2>
                                <p>
                                    {artist.city}, {artist.country}
                                </p>
                            </>
                        )}
                    </div>

                    {/* Buttons for desktop */}
                    <div className="button-container">
                        <button className="star-button-desktop">
                            <FontAwesomeIcon icon={faStar} size="3x" />
                        </button>
                        {!isEditing && (
                            <button
                                className="edit-button-desktop"
                                onClick={handleEditClick}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} size="3x" />
                            </button>
                        )}
                        {isEditing && (
                            <>
                                <button className="save-button" onClick={handleSave}>
                                    Save Changes
                                </button>
                                <button
                                    className="cancel-button"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                        <button className="chat-button">Chat</button>
                    </div>
                </div>
        </>
    );
};

export default MainInfo;
