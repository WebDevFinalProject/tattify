import React from "react";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import MainInfo from "../components/ArtistProfile/MainInfo.jsx";

function PublicProfile() {
    return (
        <>
            <NavBar />
            <MainInfo />
            <Footer />
        </>
    );
}

export default PublicProfile;
