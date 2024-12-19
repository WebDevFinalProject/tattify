import React, { useContext } from "react";
import "./styles/bio.css";
import { H2 } from "./styles/StyledComponents";
import useEditArtistProfile from "../../hooks/useEditArtistProfile";
import { UserContext } from "../../context/ContextProvider";

function Bio({ artist }) {
    const { user } = useContext(UserContext);
    console.log(user);

    // using the imported custom hook to edit info
    // initial state is bio: artist.bio, so it starts with current bio value
    // the hook manages the following states: isEditing, setIsEditing, formData, handleInputChange, handleSave
    const { isEditing, setIsEditing, formData, handleInputChange, handleSave } =
        useEditArtistProfile({
            bio: artist.bio,
        });
    return (
        <>
            {artist ? (
                <div className="artist-bio-container">
                    <H2>Bio</H2>

                    {/* Edit mode: Show input */}
                    <p>{artist.bio}</p>
                </div>
            ) : (
                <p>Bio not available</p>
            )}
        </>
    );
}

export default Bio;
