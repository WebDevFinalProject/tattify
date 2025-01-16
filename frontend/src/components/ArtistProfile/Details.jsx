import React from "react";
import "./styles/details.css";
import { H2 } from "./styles/StyledComponents";

function Details({ artist }) {
  return (
    <>
      {artist ? (
        <div className="artist-details-main-container">
          <H2>Details</H2>
          <div className="secondary-container">
            <h3>Languages</h3>
            <p>
              {artist.languagesSpoken.length > 0
                ? artist.languagesSpoken.join(", ")
                : "Languages not specified"}
            </p>

            <h3>Styles</h3>
            <p>
              {artist.specialties.length > 0
                ? artist.specialties.join(", ")
                : "Styles not specified"}
            </p>
            <h3>Base price</h3>
            <p>
              {artist && artist.basePrice
                ? `${artist.basePrice} euro`
                : "Price not available"}
            </p>

            <h3>Started tattooing</h3>
            <p>
              {artist.experience
                ? `${artist.experience} ago`
                : "Experience not specified"}
            </p>
          </div>
        </div>
      ) : (
        <p>Nothing to show here</p>
      )}
    </>
  );
}

export default Details;
