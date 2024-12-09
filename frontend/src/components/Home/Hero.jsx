import React from "react";
import "./styles/hero.css";
import HeroImage from "../../assets/hero-image-removebg.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <div className="hero-container">
            <div className="hero-text-container">
                <h1>Tattify</h1>
                <p>Find a tattoo artist today</p>
                <button className="hero-button"><Link to="/artists">Start looking</Link></button>
            </div>
            <div className="hero-image-container">
                <div className="hero-gradient"></div>
                <img src={HeroImage} alt="Tattooed Model" />
            </div>
        </div>
    );
};

export default HeroSection;
