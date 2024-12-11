import React from "react";
import "./styles/main-info.css";

const MainInfo = ({ artist }) => {
    return (
        <>
            {artist ? (
                <div className="artist-profile-main-info-container">
                    <img src={artist.profileImage} alt="" />
                    <h2>
                        {artist.firstName} {artist.lastName}
                    </h2>
                    <p>{artist.city}</p>
                </div>
            ) : (
                <p>No artist data available.</p>
            )}
        </>
    );
};

export default MainInfo;
