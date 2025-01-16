import React, { useContext } from "react";
import "./styles/bio.css";
import { H2 } from "./styles/StyledComponents";

function Bio({ artist }) {
  return (
    <>
      <div className="artist-bio-container">
        <H2>Bio</H2>

        {/* Edit mode: Show input */}
        <p>{artist.bio ? artist.bio : "Bio not available"}</p>
      </div>
    </>
  );
}

export default Bio;
