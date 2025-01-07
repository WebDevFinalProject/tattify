import React from "react";
import "./confirmDeactivateModal.css"

const ConfirmDeactivateModal = ({ showModal, onConfirm, onCancel }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Deactivate Account</h2>
        <p className="deactivate-subheading">Deactivating your account is temporary, and it means your profile will be hidden unti you reactivate it through logging in.</p>
        <div className="modal-actions">
          <button onClick={onConfirm}>Deactivate</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeactivateModal;
