import React from "react";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import MainInfo from "../components/ArtistProfile/MainInfo.jsx";
import Bio from "../components/ArtistProfile/Bio.jsx";
import Details from "../components/ArtistProfile/Details.jsx";
import { Wrapper } from "../components/ArtistProfile/styles/StyledComponents.js";
import useArtistData from "../hooks/useArtistData.jsx";

function PublicProfile() {
    const { artist, loading } = useArtistData();
    if (loading) return <p>Loading...</p>;

    return (
        <>
            <NavBar />
            <Wrapper>
                <MainInfo artist={artist} />
                <Bio artist={artist} />
                <Details artist={artist} />
            </Wrapper>
            <Footer />
        </>
    );
}

export default PublicProfile;
