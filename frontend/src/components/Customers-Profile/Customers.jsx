import React, { useContext } from "react";
import NavBar from "../NavBar";
import { UserContext } from "../../context/ContextProvider";
import "./customer.css";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

const Customers = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const navHandler = () => {
    navigate("/artists");
  };
  return (
    <>
      <NavBar />
      <div className="customer-main-profile">
        {user && (
          <div className="customer-container">
            <div className="customer-profile-image">
              <img src={user.profileImage} alt="" />
            </div>
            <div className="customer-info">
              <h1>Welcome {` ${user.firstName} ${user.lastName}`}!</h1>
              <div className="customer-route-to-artist">
                <div>
                  Discover Your Perfect Artist Match!
                  <span onClick={navHandler}>
                    <HiArrowRight />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Customers;
