import React from "react";
import "./Home/styles/Footer.css";
import { PiTelegramLogo } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

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
            <ul id="term-condition">
              <li>Terms and Conditions</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div className="footer-section">
            <ul>
              <li>About Us</li>

              <NavLink className="footer-navlink" to="/#contact-form">
                <li>Contact Us </li>
              </NavLink>

              <li>Affiliates</li>
              <NavLink className="footer-navlink" to="/#contact-form">
                <li>Support </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-line"></div>

      <div className="footer-icons">
        <PiTelegramLogo size={50} color="#fefefe" />
        <MdEmail size={50} color="#fefefe" />
        <FaFacebook size={50} color="#fefefe" />
        <IoLogoWhatsapp size={50} color="#fefefe" />
        <div className="footer-copyright">
          <p>© Copyright. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
