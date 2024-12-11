import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Test = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/artist/profile/${id}`
        );
        console.log(res.data);
        setArtist(res.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
  }, [id]);
  return (
    <>
      <h1>hi</h1>
      {artist ? (
        <div>
          <h2>{artist.firstName}</h2>
          <h3>{artist.bio}</h3>
          {/* Render other artist details here */}
        </div>
      ) : (
        <p>No artist data available.</p>
      )}
    </>
  );
};

export default Test;
