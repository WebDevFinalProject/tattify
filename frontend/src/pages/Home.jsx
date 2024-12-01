import React from "react";
import Contact from "../components/Home/Contact";
import Journey from "../components/Home/Journey";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Suggestion from "../components/Home/Suggestion";
const Home = () => {
  return (
    <>
      <NavBar />
      <Journey />
      <Suggestion />
      <Contact />

      <Footer />
    </>
  );
};
export default Home;
