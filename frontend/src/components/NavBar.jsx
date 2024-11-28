import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <>
      <div className="navbar-container">
        <div className="logo-container">
          <h1>Tattify</h1>
        </div>
        <nav>
          <NavLink>Home</NavLink>
          <NavLink>About</NavLink>
          <NavLink>Contact</NavLink>
          <NavLink>Article</NavLink>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
