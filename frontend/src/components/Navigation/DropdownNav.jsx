import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/ContextProvider";
import { NavLink } from "react-router-dom";
import { HiChat, HiUser } from "react-icons/hi";
import { FaPeopleArrows } from "react-icons/fa";

const DropdownNav = () => {
  const { user, isLoading } = useContext(UserContext);
  const userId = user?.id;

  console.log(userId);

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <>
      {user && (
        <>
          <h2 className="customer-name">{`Welcome, ${user.firstName} ${user.lastName}!`}</h2>
          <NavLink
            className="nav-profile-links"
            to={
              user?.role === "artist" ? `/artist-profile/${userId}` : "/artists"
            }
            key={userId}
          >
            {user.role === "artist" ? (
              <div>
                <HiUser />
                &nbsp; Your Profile
              </div>
            ) : (
              <div>
                <FaPeopleArrows />
                &nbsp; Find your match!
              </div>
            )}
          </NavLink>
          <NavLink className="chat-link">
            <HiChat /> &nbsp; Messages
          </NavLink>
        </>
      )}
    </>
  );
};

export default DropdownNav;
