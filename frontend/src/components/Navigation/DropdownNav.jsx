import React, { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";
import { NavLink } from "react-router-dom";

const DropdownNav = () => {
  const { user, isLoading } = useContext(UserContext);
  console.log("DropdownNav rendered", user);
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <>
      {user && user.role === "customer" && <NavLink>Artist</NavLink>}
      {user && user.role === "artist" && <NavLink>Profile</NavLink>}
    </>
  );
};

export default DropdownNav;
