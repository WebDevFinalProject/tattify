import React from "react";
import { FaHome, FaArrowLeft } from "react-icons/fa"; // Import specific icons
import "./circle-navigation.css"; // Import the CSS file
import { NavLink, useNavigate } from "react-router-dom";

const CircleNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="circle-navigation">
      {/* Home Button */}
      <NavLink to="/" className="circle-nav-button home">
        <FaHome size={30} /> {/* React Icon with size 30 */}
      </NavLink>

      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="circle-nav-button back">
        <FaArrowLeft size={30} /> {/* React Icon with size 30 */}
      </button>
    </div>
  );
};

export default CircleNavigation;
