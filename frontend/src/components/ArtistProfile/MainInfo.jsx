import "./styles/main-info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
const MainInfo = ({ artist }) => {
    return (
        <>
            {artist ? (
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
                        <button className="chat-button">Chat</button>
                    </div>
                </div>
            ) : (
                <p>No artist data available.</p>
            )}
        </>
    );
};

export default MainInfo;
