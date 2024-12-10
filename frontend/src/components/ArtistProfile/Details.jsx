import React from "react";
import "./styles/details.css";
import { H2 } from "./styles/StyledComponents";

function Details() {
    return (
        <div className="artist-details-main-container">
            <H2>Details</H2>
            <div className="secondary-container">
                <h3>Languages</h3>
                <p>English, German, Chinese</p>
                <h3>Styles</h3>
                <p>Black & Grey, Ignorant, Fineline, Cover Up</p>
                <h3>Base price</h3>
                <p>150eur / hour</p>
                <h3>Started tattooing</h3>
                <p>2015</p>
            </div>
        </div>
    );
}

export default Details;
