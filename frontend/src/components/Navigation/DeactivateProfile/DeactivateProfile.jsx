import React, { useState } from "react";
import { TiUserDelete } from "react-icons/ti";
import ConfirmDeactivateModal from "./confirmDeactivateModal.jsx"; // Import the modal
import api from "../../api.js";

const DeactivateProfile = ({ userId, logoutHandler }) => {
  const [showModal, setShowModal] = useState(false); // Modal state

  // Handle modal visibility
  const deactivateProfileHandler = () => {
    setShowModal(true);
  };

  // Confirm deactivation
  const confirmDeactivation = async () => {
    try {
      const response = await api.patch(`/api/artists/${userId}`, {});
      alert(response.data.message || "Your profile has been deactivated.");
      logoutHandler(); // Logout after successful deactivation
    } catch (error) {
      console.error("Error deactivating profile:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setShowModal(false); // Hide the modal
    }
  };

  // Cancel deactivation
  const cancelDeactivation = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="nav-button-logout" onClick={deactivateProfileHandler}>
        <TiUserDelete size={21} /> &nbsp; Deactivate Profile
      </button>
      <ConfirmDeactivateModal
        showModal={showModal}
        onConfirm={confirmDeactivation}
        onCancel={cancelDeactivation}
      />
    </>
  );
};

export default DeactivateProfile;
