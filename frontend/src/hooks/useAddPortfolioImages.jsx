import { useState } from "react";
import api from "../components/api";

const useAddPortfolioImages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [portfolio, setPortfolio] = useState([]);

  const addPortfolioImages = async (formData, token) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("/api/user/portfolio/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPortfolio(response.data.portfolio);
      return response.data;
    } catch (err) {
      setError(err.response.data.message || "Something went wrong");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addPortfolioImages, isLoading, error, portfolio };
};

export default useAddPortfolioImages;
