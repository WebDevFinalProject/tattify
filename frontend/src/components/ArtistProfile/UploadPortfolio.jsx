import React, { useRef, useState } from "react";
import useAddPortfolioImages from "../../hooks/useAddPortfolioImages";
import "./styles/UploadPortfolio.css";
import { HiPlus } from "react-icons/hi";
import { ImCross } from "react-icons/im";

function UploadPortfolio({ onClose }) {
  const { addPortfolioImages, isLoading, error } = useAddPortfolioImages();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreview] = useState([]);
  const fileInputRef = useRef(null);

  // Handle File Selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("You can only upload up to 5 files at a time.");
    }

    const selected = [...selectedFiles, ...files];
    setSelectedFiles(selected);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreview((prev) => [...prev, ...newPreviews]);
  };

  //removing selected images
  const removeImageHandler = (index) => {
    setSelectedFiles((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreview((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  // Handle File Upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFiles.length) {
      alert("Please select up to 5 files to upload.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("portfolio", file));

    try {
      await addPortfolioImages(formData);
      alert("Images added successfully!");
      onClose(); // Close modal on success
    } catch (err) {
      console.error("Error uploading portfolio images:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="upload-portfolio">
        <div className="cancel-portfolio">
          <h3>Add Portfolio Images</h3>
          <button type="button" onClick={onClose} disabled={isLoading}>
            <ImCross />
          </button>
        </div>
        <form onSubmit={handleUpload}>
          <div className="portfolio-preview">
            {previews.map((preview, index) => {
              return (
                <div className="preview-container" key={index}>
                  <img src={preview} alt="" style={{ width: "90px" }} />
                  <div
                    className="x-photo"
                    onClick={() => removeImageHandler(index)}
                  >
                    x
                  </div>
                </div>
              );
            })}
            <span>
              {selectedFiles.length > 0
                ? `${selectedFiles.length} file(s) selected`
                : " (max 5)"}
            </span>
          </div>

          <div className="portfolio-input">
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <div
              className="add-photos"
              onClick={() => fileInputRef.current.click()}
            >
              <button type="button">Add photo(s)</button>
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default UploadPortfolio;
