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
                        <p>{artist.languagesSpoken.join(", ")}</p>

                        <h3>Styles</h3>
                        <p>{artist.specialties.join(", ")}</p>
                        <h3>Base price</h3>
                        <p>{artist.basePrice} eur</p>
                        <h3>Started tattooing</h3>
                        <p>{artist.experience} ago</p>
                    </div>
                </div>
            ) : (
                <p>Nothing to show here</p>
            )}
        </>
    );
}

export default Details;
