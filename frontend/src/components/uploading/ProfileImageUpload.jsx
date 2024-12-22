import React from "react";
import useProfileImageUpload from "../../hooks/useProfileImageUpload";

const ProfileImageUpload = ({ onClose, onSuccess }) => {
  const {
    file,
    preview,
    loading,
    error,
    response,
    handleSelectFile,
    handleUpload,
  } = useProfileImageUpload();

  const handleProfileImageUpload = async () => {
    if (file) {
      await handleUpload();
      onSuccess(); // This is from the NAVBAR so it will close automaticatically if the upload is a success.
    }
  };
  return (
    <>
      <div className="upload-dialog">
        <div className="upload-dialog-content">
          <h2>Upload Profile Image</h2>
          <div className="preview-profile">
            {preview && <img src={preview} style={{ width: "50px" }} />}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleSelectFile}
            disabled={loading}
            className="file-input"
          />
          {loading && <p>Uploading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {response && (
            <p style={{ color: "green" }}>Image uploaded successfully!</p>
          )}
          <div className="profileImage-upload-buttons">
            <button
              onClick={handleProfileImageUpload}
              disabled={loading}
              className="uploadimage-button"
            >
              Upload Image
            </button>
            <button onClick={onClose} className="uploadimage-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileImageUpload;
