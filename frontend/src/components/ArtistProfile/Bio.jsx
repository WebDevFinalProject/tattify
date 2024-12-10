import React from "react";
import "./styles/bio.css";
import { H2 } from "./styles/StyledComponents";

function Bio() {
    return (
        <div className="artist-bio-container">
            <H2>Bio</H2>
            <p>
                Hi I’m Fei! A tattoo artist from China. I started my career in
                my home country and traveled around the world, learning more and
                more about tattooing until I finally settled down in Berlin.
            </p>
        </div>
    );
}

export default Bio;
