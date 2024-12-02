import React from "react";
import "./styles/hero.css";
import HeroImage from "../../assets/hero-image.jpg";

const HeroSection = () => {
    return (
        <div className="hero-container">
            <div className="text-container">
                <h1>Tattify</h1>
                <p>Find a tattoo artist today</p>
                <button>Start looking!</button>
            </div>
            <div className="image-container">
                <img src={HeroImage} alt="Tattooed Model" />
            </div>
        </div>
    );
};

export default HeroSection;
