import React from "react";
import "./styles/bio.css";
import { H2 } from "./styles/StyledComponents";

function Bio({ artist }) {
    return (
        <>
            {artist ? (
                <div className="artist-bio-container">
                    <H2>Bio</H2>
                    <p>{artist.bio}</p>
                </div>
            ) : (
                <p>Bio not available</p>
            )}
        </>
    );
}

export default Bio;
