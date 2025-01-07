import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/ContextProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { HiChat, HiLogout, HiUser } from "react-icons/hi";
import { TiUserDelete } from "react-icons/ti";
import { FaPeopleArrows } from "react-icons/fa";
import CustomSlideImages from "./CustomSlideImages";
import api from "../api";

const DropdownNav = () => {
  const { user, loading, logout } = useContext(UserContext);
  const navigate = useNavigate();

  if (loading) {
    return <div>loading...</div>;
  }

  // LOGOUT
  const logoutHandler = async () => {
    await logout();
    navigate("/login");
  };

  // DEACTIVATE PROFILE
  const deactivateProfileHandler = async () => {
    const confirmDeactivation = window.confirm(
      "Are you sure you want to deactivate your profile? This action can be reversed."
    );
    if (!confirmDeactivation) return;

    try {
      const response = await api.patch(
        `/api/artists/${user._id}`,
        {}, // No request body required for deactivation
      
      );

      alert(response.data.message || "Your profile has been deactivated.");
      logoutHandler(); // Log out the user after deactivation
    } catch (error) {
      console.error("Error deactivating profile:", error);
      alert(
        error.response?.data?.message || "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <>
      <div className="nav-profile-path open-profile-dropdown">
        <div className="account-dropdown-menu">
          <CustomSlideImages />
          <h2 className="customer-name">
            {`Welcome, ${user.firstName} ${user.lastName}!`}
          </h2>
          {user.role === "customer" && (
            <NavLink to="/artists" className="nav-profile-links">
              <FaPeopleArrows />
              &nbsp; Find your match!
            </NavLink>
          )}

          {user.role === "artist" && (
            <>
              <NavLink
                to={`/artist-profile/${user._id}`}
                className="nav-profile-links"
              >
                <HiUser />
                &nbsp; Your Profile
              </NavLink>
              <button
                className="nav-button-logout" 
                onClick={deactivateProfileHandler}
              >
               <TiUserDelete size={21} /> &nbsp; Deactivate Profile
              </button>
            </>
          )}

          <NavLink className="chat-link">
            <HiChat /> &nbsp; Messages
          </NavLink>
          <button className="nav-button-logout" onClick={logoutHandler}>
            <HiLogout size={21} /> &nbsp; Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default DropdownNav;

