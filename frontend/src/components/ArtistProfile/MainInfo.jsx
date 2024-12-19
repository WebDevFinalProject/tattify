import "./styles/main-info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";
import { useParams } from "react-router";
import DefaultProfileImage from "../../assets/default-profile-image.jpg";
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
                    src={artist.profileImage || { DefaultProfileImage }}
                    alt={`${artist.firstName} ${artist.lastName}`}
                />
                {/* Editable fields for name, city, country */}
                <div>
                    {isEditing ? (
                        <>
                            <form className="edit-artist-profile-form">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData?.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData?.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                />
                                <input
                                    type="text"
                                    name="city"
                                    value={formData?.city}
                                    onChange={handleInputChange}
                                    placeholder="City"
                                />
                                <input
                                    type="text"
                                    name="country"
                                    value={formData?.country}
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
                    {isOwner && !isEditing && (
                        <button
                            className="edit-button-desktop"
                            onClick={toggleEditMode}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} size="3x" />
                        </button>
                    )}

                    {isOwner && isEditing && (
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
export default MainInfo;
