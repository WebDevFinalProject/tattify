import React, { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";
import { NavLink } from "react-router-dom";

const DropdownNav = () => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <>
      {user && user.role === "customer" && (
        <NavLink to="/customer-profile">Artist</NavLink>
      )}
      {user && user.role === "artist" && (
        <NavLink to={`/artist-profile/${user._id}`}>Profile</NavLink>
      )}
    </>
  );
};

export default DropdownNav;
