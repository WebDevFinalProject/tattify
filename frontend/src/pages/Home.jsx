import React, { useContext } from "react";
import Contact from "../components/Home/Contact";
import Journey from "../components/Home/Journey";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Suggestion from "../components/Home/Suggestion";

import Hero from "../components/Home/Hero";
import ChatButton from "../components/Chat/ChatButton";
import { UserContext } from "../context/ContextProvider";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <NavBar />
      <body>
        {user && <ChatButton />}
        <Hero />
        <Journey />
        <Suggestion />
        <Contact />
        <Footer />
      </body>
    </>
  );
};
export default Home;
