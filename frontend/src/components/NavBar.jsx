import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useContext } from "react";
import { UserContext } from "../context/ContextProvider";
import { HiLogout } from "react-icons/hi";
import useProfileImageUpload from "../hooks/useProfileImageUpload";
import { FaCamera } from "react-icons/fa";
import DropdownNav from "./Navigation/DropdownNav";
import CustomSlideImages from "./Navigation/CustomSlideImages";

function NavBar() {
  const location = useLocation();
  const { user, logout } = useContext(UserContext);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
  const navigate = useNavigate();

  const { file, loading, error, response, handleSelectFile, handleUpload } =
    useProfileImageUpload();

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const toggleUploadDialog = () => {
    setUploadDialogOpen(!isUploadDialogOpen);
  };

  const handleProfileImageUpload = async () => {
    if (file) {
      await handleUpload(); // Upload the image using the custom hook
    }
  };

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

  const logoutHandler = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <div className="navbar-container">
        <div className="logo-container">
          <h1>Tattify</h1>
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
          <NavLink to="#">About</NavLink>
          <NavLink to="/#contact-form">Contact</NavLink>
          <NavLink to="/articles">Article</NavLink>
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

            {activeDropdown === "profile" && (
              <div className="nav-profile-path open-profile-dropdown">
                <div className="account-dropdown-menu">
                  <CustomSlideImages />
                  {user && (
                    <>
                      <DropdownNav />
                      <button
                        className="nav-button-logout"
                        onClick={logoutHandler}
                      >
                        <HiLogout size={21} /> &nbsp; Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
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
          <div className="upload-dialog">
            <div className="upload-dialog-content">
              <h2>Upload Profile Image</h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleSelectFile}
                disabled={loading}
                className="file-input"
              />
              {loading && <p>Uploading...</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
              {response && (
                <p style={{ color: "green" }}>Image uploaded successfully!</p>
              )}
              <button
                onClick={handleProfileImageUpload}
                disabled={loading}
                className="uploadimage-button"
              >
                Upload Image
              </button>
              <button
                onClick={toggleUploadDialog}
                className="uploadimage-button"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NavBar;
