import React, { useContext } from "react";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import MainInfo from "../components/ArtistProfile/MainInfo.jsx";
import Bio from "../components/ArtistProfile/Bio.jsx";
import Details from "../components/ArtistProfile/Details.jsx";
import { Wrapper } from "../components/ArtistProfile/styles/StyledComponents.js";
import useArtistData from "../hooks/useArtistData.jsx";
import Portfolio from "../components/ArtistProfile/Portfolio.jsx";
import Reviews from "../components/ArtistProfile/Reviews.jsx";
import { UserContext } from "../context/ContextProvider.jsx";
import { useParams } from "react-router-dom";

function PublicProfile() {
  //import fetched data from database
  const { artist, loading } = useArtistData();
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const isOwner = user && user?._id === id;

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <NavBar />
      <Wrapper>
        <MainInfo artist={artist} />
        <div className="bio-details">
          <Bio artist={artist} />
          <Details artist={artist} />
        </div>
        <div className="porfolio-reviews">
          <Portfolio artist={artist} />
          <Reviews artist={artist} isOwner={isOwner} />
        </div>
      </Wrapper>
      <Footer />
    </>
  );
}

export default PublicProfile;
