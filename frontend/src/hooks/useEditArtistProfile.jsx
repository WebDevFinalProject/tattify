import { useContext, useState } from "react";
import { UserContext } from "../context/ContextProvider";
import api from "../components/api";
import { useParams } from "react-router-dom";

const useEditArtistProfile = () => {
    const [isEditing, setIsEditing] = useState(false); // Edit mode state
    const { id } = useParams();
    const { user, setUser } = useContext(UserContext); // Access user from Context
    const [formData, setFormData] = useState({
        bio: user?.bio || "",
        specialties: user?.specialties || [],
        city: user?.city || "",
        country: user?.country || "",
        basePrice: user?.basePrice || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        languages: user?.languages || "",
        experience: user?.experience || "",
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
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/artists/${id}`, formData);

            setUser((prevData) => ({ ...prevData, ...formData }));
            setIsEditing(false); // Exit edit mode
            toggleEditMode();
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
