import React from "react";
import { FaHome, FaArrowLeft } from "react-icons/fa"; // Import specific icons
import "./circle-navigation.css"; // Import the CSS file

const CircleNavigation = () => {
  return (
    <div className="circle-navigation">
      {/* Home Button */}
      <a href="/" className="circle-nav-button home">
        <FaHome size={30} /> {/* React Icon with size 30 */}
      </a>

      {/* Back Button */}
      <a href="javascript:history.back()" className="circle-nav-button back">
        <FaArrowLeft size={30} /> {/* React Icon with size 30 */}
      </a>
    </div>
  );
};

export default CircleNavigation;
