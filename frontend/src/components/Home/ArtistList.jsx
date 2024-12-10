import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { SlLocationPin } from "react-icons/sl";
import "./ArtistList.css";

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // State to store the search input

  useEffect(() => {
    const fetchArtists = async () => {

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/api/artists/profile?city=${search}`
        );
        setArtists(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load artists.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [search]); // Fetch artists whenever the search term changes

  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="artist-hero-image mb-5 p-5">
        <div>
          <h1 className="display-4 pt-5">Hire Artists</h1>
          <p className="lead">
            Transform your ideas into art — hire a talented tattoo artist today.
          </p>
        </div>
      </div>

      <h1 className="text-center mb-4">Our Artists</h1>
      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or city..."
          value={search}  // Bind search state to the input
          onChange={(e) => setSearch(e.target.value)}  // Update search state on input change
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {artists.map((artist) => (
          <div key={artist._id} className="col-md-4">
            <div className="card mb-4 artistListCard">
              {/* Portfolio Images */}
              <div className="portfolio-container d-flex">
                {artist.user.portfolio.map((work, index) => (
                  <img
                    key={index}
                    src={work}
                    alt={`Work ${index + 1}`}
                    className="portfolio-img"
                    style={{
                      width: "33%",
                      height: "100px",
                      objectFit: "cover",
                      margin: 1,
                    }}
                  />
                ))}
              </div>
              {/* Profile Picture */}
              <div
                className="text-center"
                style={{ marginTop: "-40px" }} // Negative margin to overlap
              >
                <img
                  src={
                    artist.user.profileImage ||
                    "https://via.placeholder.com/100"
                  }
                  alt={artist.user.firstName}
                  className="rounded-circle"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    border: "3px solid white",
                  }}
                />
              </div>
              {/* Name, Location, and Chat Button */}
              <div className="card-body text-center">
                <h3 className="card-title">
                  {`${artist.user.firstName} ${artist.user.lastName}`}
                </h3>
                <p className="card-text fs-4">
                  <SlLocationPin className="fs-5" />
                  {artist.city} {artist.country}
                </p>
                <button className="btn btn-danger fs-5">Chat</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
