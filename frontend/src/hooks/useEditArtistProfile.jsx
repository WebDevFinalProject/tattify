import { useContext, useState } from "react";
import { UserContext } from "../context/ContextProvider";
import api from "../components/api";
import { useParams } from "react-router-dom";
import useChangeHandler from "./useChangeHandler";

const useEditArtistProfile = () => {
  const [isEditing, setIsEditing] = useState(false); // Edit mode state
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext); // Access user from Context

  const initialState = {
    bio: "",
    specialties: [],
    city: "",
    country: "",
    basePrice: "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    languagesSpoken: [],
    experience: "",
    isAvailable: false,
  };

  const { formData, setFormData, handleChange } =
    useChangeHandler(initialState);

  // Handle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
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
    handleChange,
    handleSave,
    toggleAvailability,
  };
};

export default useEditArtistProfile;
