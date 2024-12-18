import { useContext, useState } from "react";
import api from "../components/api";
import { UserContext } from "../context/ContextProvider";

const useProfileImageUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const { setUser } = useContext(UserContext);

  const handleSelectFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
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

      setUser((prev) => ({
        ...prev,
        profileImage: res.data.profileImage,
      }));

      setResponse(res.data);
      setPreview(res.data.profileImage);
      setError(null); // Clear any previous errors
      setPreview(null);
      setTimeout(() => {
        setResponse(null); // Clear the response on error
      }, 4000);
    } catch (error) {
      setError("An error occurred while uploading the image.");
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
    preview,
    setFile,
  };
};

export default useProfileImageUpload;
