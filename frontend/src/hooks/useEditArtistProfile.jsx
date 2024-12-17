import { useState } from "react";
import axios from "axios";

const useEditArtistProfile = (artist) => {
    const [isEditing, setIsEditing] = useState(false); // Edit mode state
    const [formData, setFormData] = useState({
        bio: artist?.bio || "",
        specialties: artist?.specialties || "",
        languagesSpoken: artist?.languagesSpoken || "",
        city: artist?.city || "",
        country: artist?.country || "",
        basePrice: artist?.basePrice || "",
    });

    // Handle input changes in form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Save updated data to the backend
    const handleSave = async () => {
        try {
            const response = await axios.put(
                `/api/artists/${artist.id}`,
                formData
            );
            console.log("Profile updated successfully:", response.data);
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return {
        isEditing,
        setIsEditing,
        formData,
        handleInputChange,
        handleSave,
    };
};

export default useEditArtistProfile;
