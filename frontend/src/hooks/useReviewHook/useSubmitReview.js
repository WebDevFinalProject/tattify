import { useState, } from "react";
import  api from "../../components/api.js"


const useSubmitReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitReview = async (artistId, rating, comment) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post(
        "/api/submit-review",
        { artistId, rating, comment },
        { withCredentials: true } // Send cookies for authentication
      );
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return { submitReview, loading, error, success };
};


export default useSubmitReview;