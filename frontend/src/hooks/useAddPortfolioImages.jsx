import { useContext, useState } from "react";
import api from "../components/api";
import { UserContext } from "../context/ContextProvider";

const useAddPortfolioImages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);

  const addPortfolioImages = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("/api/user/portfolio/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser((prev) => ({
        ...prev,
        portfolio: response.data.portfolio,
      }));
    } catch (err) {
      setError(err.response.data.message || "Something went wrong");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addPortfolioImages, isLoading, error};
};

export default useAddPortfolioImages;
