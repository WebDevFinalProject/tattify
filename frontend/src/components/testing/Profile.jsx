import React, { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <>
      {user && (
        <div>
          <img src={user.portfolio} />
          <h1>NAME : {user.firstName}</h1>
          <p>{user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
};

export default Profile;
