import React from "react";
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

function PublicProfile() {
    //import fetched data from database
    const { artist, loading } = useArtistData();

    // import editing logic from custom hook
    const { isEditing, setIsEditing, formData, handleInputChange, handleSave } =
        useEditArtistProfile();

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <NavBar />
            <Wrapper>
                <MainInfo
                    artist={artist}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    handleInputChange={handleInputChange}
                />
                <Bio
                    artist={artist}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    handleInputChange={handleInputChange}
                />
                <Details
                    artist={artist}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    handleInputChange={handleInputChange}
                />
                <Portfolio artist={artist} />
                <Reviews />
            </Wrapper>
            <Footer />
            {/* Save Button (for all edits) */}
            {isEditing && (
                <div className="artist-save-button-container">
                    <button onClick={handleSave} className="save-button">
                        Save Changes
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </>
    );
}

export default PublicProfile;
