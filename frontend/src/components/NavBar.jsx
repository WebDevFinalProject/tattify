import React from "react";
import "./NavBar.css";

function NavBar() {
    return (
        <>
            <div className="navbar-container">
                <div className="logo-container">
                    <h1>Tattify</h1>
                </div>
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Articles</li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default NavBar;
