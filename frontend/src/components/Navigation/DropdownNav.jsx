import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/ContextProvider";
import { NavLink } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { FaPeopleArrows } from "react-icons/fa";

const DropdownNav = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      {user.role === "customer" && (
        <NavLink to="/artists" className="nav-profile-links">
          <FaPeopleArrows />
          &nbsp; Find your match!
        </NavLink>
      )}

      {user.role === "artist" && (
        <NavLink
          to={`/artist-profile/${user._id}`}
          className="nav-profile-links"
        >
          <HiUser />
          &nbsp; Your Profile
        </NavLink>
      )}
    </>
  );
};

export default DropdownNav;
