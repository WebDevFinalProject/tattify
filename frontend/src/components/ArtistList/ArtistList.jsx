import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { SlLocationPin } from "react-icons/sl";
import "./ArtistList.css";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // Search term
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(9);


  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/api/artists/profile`,
          {
            params: {
              search,
              page,
              limit,
            },
          }
        );
        setArtists(response.data.artists);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load artists.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [search, page, limit]);

  return (
    <div className="artist-list">
      <NavBar />
      <div className="my-5 container-fluid">
        <div className="artist-hero-image mb-5 p-5">
          <div>
            <h1 className="display-4 pt-5">Hire Artists</h1>
            <p className="lead">
              Transform your ideas into art — hire a talented tattoo artist
              today.
            </p>
            {/* Single Search Bar */}
            <div className="m-4 search-bar d-flex justify-content-center">
              <input
                type="text"
                className="form-control w-25"
                placeholder=" 🔍 Search by location or name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <h1 className="text-center mb-4 search-bar-heading">Our Artists</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        <div className="row m-5">
          {artists.map((artist) => (
            <div key={artist._id} className="col-xl-4 col-md-6">
              <Link
                to={`/artist-profile/${artist.user._id}`}
                className="text-decoration-none"
              >
                <div className="card mb-4 artistListCard p-2 m-4">
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
                  <div
                    className="text-center"
                    style={{ marginTop: "-40px" }}
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
                  <div className="card-body text-center">
                    <h3 className="card-title">
                      {`${artist.user.firstName} ${artist.user.lastName}`}
                    </h3>
                    <p className="card-text fs-4">
                      <SlLocationPin className="fs-5" />
                      {artist.city}, {artist.country}
                    </p>
                    <button className="btn btn-danger fs-5">
                      <Link className="text-light text-decoration-none" to="/register">
                        Chat
                      </Link>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls text-center">
          <button
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            {" "}Page {page} of {totalPages}{" "}
          </span>
          <button
            onClick={() => setPage(page < totalPages ? page + 1 : page)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistList;
