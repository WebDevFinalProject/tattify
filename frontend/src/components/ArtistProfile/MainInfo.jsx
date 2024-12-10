import React from "react";
import ProfileImagePlaceholder from "../../assets/profile-image-placeholder.jpg";
import "./styles/main-info.css";

function MainInfo() {
    return (
        <div className="artist-profile-main-info-container">
            <img src={ProfileImagePlaceholder} alt="" />
            <h2>Fei Xiu</h2>
            <p>Berlin, Germany</p>
            <button>Chat</button>
        </div>
    );
}

export default MainInfo;
