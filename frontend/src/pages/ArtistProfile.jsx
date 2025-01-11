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
import useEditArtistProfile from "../hooks/useEditArtistProfile.jsx";
import { UserContext } from "../context/ContextProvider.jsx";
import { HiChat } from "react-icons/hi";
import Chat from "../components/Chat/Chat.jsx";

function PublicProfile() {
  //import fetched data from database
  const { artist, loading } = useArtistData();
  const { user, clickHandlerVisibility, isOpen } = useContext(UserContext);

  // import editing logic from custom hook
  const {
    isEditing,
    setIsEditing,
    toggleEditMode,
    formData,
    handleInputChange,
    handleSave,
  } = useEditArtistProfile();

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <NavBar />
      <Wrapper>
        <MainInfo
          artist={artist}
          isEditing={isEditing}
          formData={formData}
          handleSave={handleSave}
          setIsEditing={setIsEditing}
          toggleEditMode={toggleEditMode}
          handleInputChange={handleInputChange}
        />

        <div className="bio-details">
          <Bio
            artist={artist}
            isEditing={isEditing}
            formData={formData}
            handleSave={handleSave}
            setIsEditing={setIsEditing}
            handleInputChange={handleInputChange}
          />
          <Details
            artist={artist}
            isEditing={isEditing}
            formData={formData}
            handleSave={handleSave}
            setIsEditing={setIsEditing}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="porfolio-reviews">
          <Portfolio artist={artist} />
          <Reviews artist={artist} />
        </div>
      </Wrapper>
      <Footer />
    </>
  );
}

export default PublicProfile;
