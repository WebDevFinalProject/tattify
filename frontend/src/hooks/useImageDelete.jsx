import React, { useContext } from "react";
import { UserContext } from "../context/ContextProvider";
import api from "../components/api";

const useImageDelete = () => {
  const { user, setUser } = useContext(UserContext);

  const deleteImageHandler = async (image) => {
    if (
      !window.confirm(
        "Are you sure you want to delete? \n\nThis will permanently delete your image."
      )
    )
      return;

    try {
      await api.patch(`/api/${user._id}/delete-image`, {
        imageToDelete: image,
      });

      const updatedPortfolio = user.portfolio.filter((img) => img !== image);

      setUser({ ...user, portfolio: updatedPortfolio });
    } catch (error) {
      alert("Failed to delete the image. Please try again.");
    }
  };

  return { deleteImageHandler };
};

export default useImageDelete;
