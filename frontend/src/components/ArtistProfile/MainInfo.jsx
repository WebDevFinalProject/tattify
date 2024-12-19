import "./styles/main-info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { UserContext } from "../../context/ContextProvider";
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
    const isOwner = user && user?._id === id;
    // Local state for editing
    // const [editableArtist, setEditableArtist] = useState({
    //     firstName: artist?.firstName || "",
    //     lastName: artist?.lastName || "",
    //     city: artist?.city || "",
    //     country: artist?.country || "",
    // });

    // Toggle edit mode
    // const handleEditClick = () => {
    //     setIsEditing(!isEditing);
    // };

    // Save changes
    // const handleSave = () => {
    //     if (onSave) onSave(editableArtist); // Pass updated data to parent
    //     setIsEditing(false);
    // };
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
                        <>
                            <form className="edit-artist-profile-form">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={user.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={user.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                />
                                <input
                                    type="text"
                                    name="city"
                                    value={user.city}
                                    onChange={handleInputChange}
                                    placeholder="City"
                                />
                                <input
                                    type="text"
                                    name="country"
                                    value={user.country}
                                    onChange={handleInputChange}
                                    placeholder="Country"
                                />
                            </form>
                        </>
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
                            onClick={toggleEditMode}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} size="3x" />
                        </button>
                    )}
                    {isEditing && (
                        <>
                            <button
                                className="save-button"
                                onClick={handleSave}
                            >
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
