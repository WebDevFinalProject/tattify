import "./styles/main-info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";

const MainInfo = ({ artist, isEditing, setIsEditing, handleInputChange }) => {
  const { user } = useContext(UserContext);

  //Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div className="artist-profile-main-info-container">
        <button className="star-button-phone">
          <FontAwesomeIcon icon={faStar} />
        </button>
        <img
          src={`${user ? user.profileImage : artist.profileImage}`}
          alt="profile image"
        />

        {/* Editable fields for name, city, country */}
        <div>
          {isEditing ? (
            <>
              <form action="" className="edit-artist-profile-form">
                <input
                  type="text"
                  name="firstName"
                  value={artist.firstName || ""}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={artist.lastName || ""}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
                <input
                  type="text"
                  name="city"
                  value={artist.city || ""}
                  onChange={handleInputChange}
                  placeholder="City"
                />
                <input
                  type="text"
                  name="country"
                  value={artist.country || ""}
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

          {/* Edit button */}
          {!isEditing && (
            <button className="edit-button-desktop" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faPenToSquare} size="3x" />
            </button>
          )}

          {/* Save and Cancel buttons (show when in edit mode) */}
          {isEditing && (
            <>
              <button className="save-button" onClick={() => handleEditClick()}>
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
      {/*   ) : (
        <p>No artist data available.</p>
      )} */}
      {/* {artist ? (
                <div className="artist-profile-main-info-container">
                    <button className="star-button-phone">
                        <FontAwesomeIcon icon={faStar} />
                    </button>
                    <img src={artist.profileImage} alt="" />
                    <div>
                        <h2>
                            {artist.firstName} {artist.lastName}
                        </h2>
                        <p>
                            {artist.city}, {artist.country}
                        </p>
                    </div>
                    <div className="button-container">
                        <button className="star-button-desktop">
                            <FontAwesomeIcon icon={faStar} size="3x" />
                        </button>
                        <button className="edit-button-desktop">
                            <FontAwesomeIcon icon={faPenToSquare} size="3x" />
                        </button>
                        <button className="chat-button">Chat</button>
                    </div>
                </div>
            ) : (
                <p>No artist data available.</p>
            )} */}
    </>
  );
};

export default MainInfo;
