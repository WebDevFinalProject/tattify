import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const useArtistData = () => {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:4000/api/artist/profile/${id}`
                );
                setArtist(res.data);
            } catch (error) {
                console.error("Error fetching artist data:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArtist();
    }, [id]);

    return { artist, loading };
};

export default useArtistData;
