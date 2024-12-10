import React from "react";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import MainInfo from "../components/ArtistProfile/MainInfo.jsx";
import styled from "styled-components";
import Bio from "../components/ArtistProfile/Bio.jsx";

const Wrapper = styled.section`
    padding: 0rem 4rem;
    background: linear-gradient(
        180deg,
        rgb(229, 209, 188) 0%,
        rgba(0, 0, 0, 0) 50%
    );
`;

function PublicProfile() {
    return (
        <>
            <NavBar />
            <Wrapper>
                <MainInfo />
                <Bio />
            </Wrapper>
            <Footer />
        </>
    );
}

export default PublicProfile;
