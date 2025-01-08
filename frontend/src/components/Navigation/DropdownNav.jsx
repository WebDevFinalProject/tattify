import React, { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { HiChat, HiLogout, HiUser } from "react-icons/hi";
import { FaPeopleArrows } from "react-icons/fa";
import CustomSlideImages from "./CustomSlideImages";
import DeactivateProfile from "./DeactivateProfile/DeactivateProfile"; // Import the new component

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

  return (
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
            <DeactivateProfile
              userId={user._id}
              logoutHandler={logoutHandler}
            />
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
  );
};

export default DropdownNav;
