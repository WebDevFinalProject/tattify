import { useContext, useState } from "react";
import { UserContext } from "../context/ContextProvider";
import api from "../components/api";

const useEditArtistProfile = () => {
    const [isEditing, setIsEditing] = useState(false); // Edit mode state
    const { user, setUser } = useContext(UserContext); // Access user from Context
    const [formData, setFormData] = useState({
        bio: user?.bio || "",
        specialties: user?.specialties || "",
        languagesSpoken: user?.languagesSpoken || "",
        city: user?.city || "",
        country: user?.country || "",
        basePrice: user?.basePrice || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
    });

    // Handle edit mode
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Save updated data to the backend
    const handleSave = async () => {
        try {
            const response = await api.put(
                `/api/artists/${user?.id}`,
                formData
            );

            console.log("Profile updated successfully:", response.data);
            setUser(response.data); // Update user with new profile data
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return {
        isEditing,
        setIsEditing,
        toggleEditMode,
        formData,
        handleInputChange,
        handleSave,
    };
};

export default useEditArtistProfile;
