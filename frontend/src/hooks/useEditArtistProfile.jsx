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
    languagesSpoken: user?.languagesSpoken || [],
    experience: user?.experience || "",
    isAvailable: user?.isAvailable || false,
  });

  // Handle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "specialties" || name === "languagesSpoken") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((item) => item),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Toggle availability
  const toggleAvailability = async () => {
    try {
      const updatedAvailability = !formData.isAvailable;
      setFormData((prevData) => ({
        ...prevData,
        isAvailable: updatedAvailability,
      }));

      await api.put(`/api/artists/${id}`, {
        isAvailable: updatedAvailability,
      });

      setUser((prevUser) => ({
        ...prevUser,
        isAvailable: updatedAvailability,
      }));
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
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
    setFormData,
    handleInputChange,
    handleSave,
    toggleAvailability,
  };
};

export default useEditArtistProfile;
