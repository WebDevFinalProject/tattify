import React, { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";
import NavBar from "../NavBar";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      {user && (
        <div>
          <img src={user.profileImage} />
          <h1>NAME : {user.firstName}</h1>
          <p>{user.email}</p>
        </div>
      )}
    </>
  );
};

export default Profile;
