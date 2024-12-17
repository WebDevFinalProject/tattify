import React, { useState } from "react";
import useAddPortfolioImages from "../../hooks/useAddPortfolioImages";
import "./styles/UploadPortfolio.css"

function UploadPortfolio({ token, onClose }) {
    const { addPortfolioImages, isLoading, error } = useAddPortfolioImages();
    const [selectedFiles, setSelectedFiles] = useState([]);

    // Handle File Selection
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 5) {
            alert("You can only upload up to 5 files at a time.");
        } else {
            setSelectedFiles(files);
        }
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
            await addPortfolioImages(formData, token);
            alert("Images added successfully!");
            onClose(); // Close modal on success
        } catch (err) {
            console.error("Error uploading portfolio images:", err);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Upload Portfolio Images</h3>
                <form onSubmit={handleUpload}>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <p>
                        {selectedFiles.length
                            ? `${selectedFiles.length} files selected`
                            : "No files selected"}
                    </p>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Uploading..." : "Upload"}
                    </button>
                    <button type="button" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </button>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    );
}

export default UploadPortfolio;
