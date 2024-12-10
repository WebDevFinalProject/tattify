import React, { useEffect } from "react";
import "./NavBar.css";
import { NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useContext } from "react";
import { UserContext } from "../context/ContextProvider";

function NavBar() {
  const location = useLocation();
  const { user, clickHandlerVisibility, isOpen, logout } =
    useContext(UserContext);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <div className="navbar-container">
        <div className="logo-container">
          <h1>Tattify</h1>
        </div>
        <div className="nav-icon" onClick={clickHandlerVisibility}>
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
        <nav className={`nav-links ${isOpen ? "open-nav" : ""}`}>
          <div className="nav-header-dropdown">
            <h2>Tattify</h2>
          </div>
          <NavLink to="/">Home</NavLink>
          <NavLink>About</NavLink>
          <NavLink to="/#contact-form">Contact</NavLink>
          <NavLink to="/articles">Article</NavLink>
        </nav>
        {user ? (
          <div className="button-container">
            <button className="nav-button" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="button-container">
            <NavLink to="/login" className="nav-button">
              Login/Register
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
}

export default NavBar;
