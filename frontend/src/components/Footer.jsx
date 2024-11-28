import React from "react";
import "./Home/styles/Footer.css";
import { PiTelegramLogo } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <h1>Tattify</h1>
          <p>Where Vision Meets the Needle</p>
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <ul>
              <li>Terms and Conditions</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div className="footer-section">
            <ul>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Affiliates</li>
              <li>Support</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-line"></div>

      <div className="footer-icons">
        <PiTelegramLogo size={50} color="#0088cc" />
        <MdEmail size={50} color="0088cc" />
        <FaFacebook size={50} color="0088cc" />
        <IoLogoWhatsapp size={50} color="0088cc" />
      </div>

      <div className="footer-copyright">
        <p>Copyright. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
