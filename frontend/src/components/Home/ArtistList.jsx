import React, { useState, useEffect } from "react";
import axios from "axios";

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/artists/profile"
        ); // API endpoint
        setArtists(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load artists.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Our Artists</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {artists.map((artist) => (
          <div key={artist._id} className="col-md-4">
            <div className="card mb-4">
              {/* Portfolio images */}
              <div className="d-flex">
                {artist.user.portfolio.slice(0, 3).map((work, index) => (
                  <img
                    key={index}
                    src={work.imageUrl}
                    alt={`Work ${index + 1}`}
                    className="w-100"
                    style={{
                      width: "33.33%",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
              {/* Profile Picture */}
              <div className="text-center mt-3">
                <img
                  src={
                    artist.user.profileImage ||
                    "https://via.placeholder.com/100"
                  }
                  alt={artist.user.firstName}
                  className="rounded-circle"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              </div>
              {/* Name, location, and chat button */}
              <div className="card-body text-center">
                <h5 className="card-title">
                  {`${artist.user.firstName} ${artist.user.lastName}`}
                </h5>
                <p className="card-text">
                  {artist.city}, {artist.country}
                </p>
                <button className="btn btn-primary">Chat</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;

