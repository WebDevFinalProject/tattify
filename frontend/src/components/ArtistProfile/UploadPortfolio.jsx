import React, { useEffect, useRef, useState } from "react";
import useAddPortfolioImages from "../../hooks/useAddPortfolioImages";
import "./styles/UploadPortfolio.css";
import { ImCross } from "react-icons/im";

function UploadPortfolio({ onClose }) {
  const { addPortfolioImages, isLoading, error } = useAddPortfolioImages();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreview] = useState([]);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer); // Cleanup on unmount or re-render
    }
  }, [message]);

  // Handle File Selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (selectedFiles.length + files.length > 5) {
      setMessage("You can only upload up to 5 files at a time.");
      return;
    }

    const validFiles = files.slice(0, 5 - selectedFiles.length);
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));

    //const selected = [...selectedFiles, ...validFiles];

    setSelectedFiles((prev) => [...prev, ...validFiles]);
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

    if (selectedFiles.length === 0) {
      setMessage("Please select at least one file to upload.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("portfolio", file));

    try {
      await addPortfolioImages(formData);
      alert("Images added successfully!");
      setSelectedFiles([]);
      setPreview([]);
      onClose();
    } catch (err) {
      setMessage(err.response?.data?.message || "An error occurred.");
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
                ? `${selectedFiles.length} file(s) selected (max 5 photos)`
                : " (max 5 photos)"}
            </span>
          </div>
          {message && (
            <p style={{ color: "red", paddingBottom: "15px" }}>{message}</p>
          )}

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
