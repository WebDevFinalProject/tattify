import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../components/api";

const useArtistData = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval;
    const fetchArtist = async () => {
      try {
        const res = await api.get(`/api/artist/profile/${id}`);
        setArtist(res.data);
      } catch (error) {
        console.error("Error fetching artist data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
    interval = setInterval(fetchArtist, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [id]);

  return { artist, loading };
};

export default useArtistData;
