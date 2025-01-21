import React, { useState } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useContext } from "react";
import { UserContext } from "../context/ContextProvider";
import { FaCamera } from "react-icons/fa";
import DropdownNav from "./Navigation/DropdownNav";
import ProfileImageUpload from "./uploading/ProfileImageUpload";
import useLocationFinder from "../hooks/useLocationFinder";
import useStopScroll from "../hooks/useStopScroll";

function NavBar() {
  useLocationFinder();
  const { user } = useContext(UserContext);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  //image
  const toggleUploadDialog = () => {
    setUploadDialogOpen(!isUploadDialogOpen);
  };

  const handleProfileImageSuccess = async () => {
    toggleUploadDialog();
  };

  useStopScroll(isUploadDialogOpen);

  return (
    <>
      <div className="navbar-container">
        <div className="logo-container">
          <NavLink to="/">Tattify</NavLink>
        </div>
        <div className="nav-icon" onClick={() => toggleDropdown("nav")}>
          {activeDropdown === "nav" ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
        <nav
          className={`nav-links ${activeDropdown === "nav" ? "open-nav" : ""}`}
        >
          <div className="nav-header-dropdown">
            <h2>Tattify</h2>
          </div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/#about">About</NavLink>
          <NavLink to="/#contact-form">Contact</NavLink>
          <NavLink to="/articles">Article</NavLink>
          <NavLink to="/users/forum">Community</NavLink>
          <NavLink to="/artists">Artists</NavLink>
        </nav>
        {user ? (
          <div className="nav-dropdown-container">
            <div
              className="nav-account"
              onClick={() => toggleDropdown("profile")}
            >
              <img
                src={user.profileImage}
                alt="User Profile"
                className="user-profile-img"
              />
              <FaCamera
                onClick={(e) => {
                  e.stopPropagation();
                  toggleUploadDialog();
                }}
                className="camera-icon"
              />
            </div>
            {activeDropdown === "profile" && <DropdownNav />}
          </div>
        ) : (
          <div className="button-container">
            <NavLink to="/login" className="nav-button">
              Login/Register
            </NavLink>
          </div>
        )}

        {/* Dialog for uploading the profile image */}
        {isUploadDialogOpen && (
          <ProfileImageUpload
            onClose={toggleUploadDialog}
            onSuccess={handleProfileImageSuccess}
          />
        )}
      </div>
    </>
  );
}

export default NavBar;
