import React from "react";
import "./styles/main-info.css";

const MainInfo = ({ artist }) => {
    return (
        <>
            {artist ? (
                <div className="artist-profile-main-info-container">
                    <img src={artist.profileImage} alt="" />
                    <div>
                        <h2>
                            {artist.firstName} {artist.lastName}
                        </h2>
                        <p>
                            {artist.city}, {artist.country}
                        </p>
                    </div>
                    <button>Chat</button>
                </div>
            ) : (
                <p>No artist data available.</p>
            )}
        </>
    );
};

export default MainInfo;
