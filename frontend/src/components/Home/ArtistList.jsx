import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { SlLocationPin } from "react-icons/sl";
import "./ArtistList.css";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // Single search input

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/api/artists/profile`, {
          params: { search }, // Pass search term directly
        });
        setArtists(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load artists.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [search]);

  return (
    <div className="artist-list">
      <NavBar />
      <div className="my-5 container-fluid">
        <div className="artist-hero-image mb-5 p-5">
          <div>
            <h1 className="display-4 pt-5">Hire Artists</h1>
            <p className="lead">
              Transform your ideas into art — hire a talented tattoo artist today.
            </p>
            {/* Single Search Bar */}
            <div className="m-4 search-bar d-flex justify-content-center">
              <input
                type="text"
                className="form-control w-25"
                placeholder="Search by city or country..."
                value={search} // Bind search state to the input
                onChange={(e) => setSearch(e.target.value)} // Update search state on input change
              />
            </div>
          </div>
        </div>

        <h1 className="text-center mb-4 search-bar-heading">Our Artists</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        <div className="row m-5">
          {artists.map((artist) => (
            <div key={artist._id} className="col-xl-4  col-md-6">
              <div className="card mb-4 artistListCard p-2 m-4">
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
                    {artist.city}, {artist.country}
                  </p>
                  <button className="btn btn-danger fs-5">
                    <Link
                      className="text-light text-decoration-none"
                      to="/register"
                    >
                      Chat
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistList;
