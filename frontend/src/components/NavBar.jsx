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
          <NavLink to="/articles">Article</NavLink>
        </nav>
        <div className="button-container">
          <button>Login/Register</button>
         </div>
      </div>
    </>
  );
}

export default NavBar;
