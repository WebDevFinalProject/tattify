import { useState } from "react";
import api from "../components/api";

const useProfileImageUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSelectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file before uploading.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", file); // Adjusted to match the backend field name

      const res = await api.post("/api/profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResponse(res.data); // Assuming your backend returns the updated user profile image URL
      window.close();
      window.location.href = "/artists";
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message || "An error occurred while uploading the image.");
      setResponse(null); // Clear the response on error
    } finally {
      setLoading(false);
    }
  };

  return {
    file,
    loading,
    response,
    error,
    handleSelectFile,
    handleUpload,
  };
};

export default useProfileImageUpload;
