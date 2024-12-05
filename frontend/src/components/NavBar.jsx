import React, { useState } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const navOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="navbar-container">
                <div className="logo-container">
                    <h1>Tattify</h1>
                </div>
                <div className="nav-icon" onClick={navOpen}>
                    {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </div>
                <nav className={`nav-links ${isOpen ? "open-nav" : ""}`}>
                    <div className="nav-header-dropdown">
                        <h2>Tattify</h2>
                    </div>
                    <NavLink>Home</NavLink>
                    <NavLink>About</NavLink>
                    <NavLink>Contact</NavLink>
                    <NavLink to="/articles">Article</NavLink>
                </nav>
                <div className="button-container">
                    <button className="nav-button">
                        <NavLink to="/login">Login/Register</NavLink>
                    </button>
                </div>
            </div>
        </>
    );
}

export default NavBar;
