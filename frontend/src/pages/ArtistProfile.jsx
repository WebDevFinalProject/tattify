import React from "react";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import MainInfo from "../components/ArtistProfile/MainInfo.jsx";
import styled from "styled-components";
import Bio from "../components/ArtistProfile/Bio.jsx";
import Details from "../components/ArtistProfile/Details.jsx";
import { Wrapper } from "../components/ArtistProfile/styles/StyledComponents.js";

function PublicProfile() {
    return (
        <>
            <NavBar />
            <Wrapper>
                <MainInfo />
                <Bio />
                <Details />
            </Wrapper>
            <Footer />
        </>
    );
}

export default PublicProfile;
