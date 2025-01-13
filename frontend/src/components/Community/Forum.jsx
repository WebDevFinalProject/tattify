import React, { useContext, useState } from "react";
import NavBar from "../NavBar";
import { HiMinus, HiPlus } from "react-icons/hi";
import { UserContext } from "../../context/ContextProvider";
import "../Community/forum.css";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const Forum = () => {
  const { user } = useContext(UserContext);
  const [post, setPost] = useState();
  const [openToWrite, setOpenToWrite] = useState(false);
  const [message, setMessage] = useState("");

  const clickVisibility = () => {
    if (!user) {
      setMessage("Please login or create an account.");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } else {
      setOpenToWrite(!openToWrite);
    }
  };

  const changeHandler = (e) => {
    setPost(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
  };

  const submitHandler = () => {};
  return (
    <div className="forum">
      <NavBar />
      <div className="community-page">
        <div className="forum-heading">
          <div className="heading-message">
            <h1>Welcome to Our Inked Community: Where Creativity Meets Skin</h1>
            <p>
              Step into a world where art and ink come to life. Whether you're a
              tattoo artist, a tattoo enthusiast, or someone looking to get your
              first design, this is the perfect space to connect, share, and be
              inspired. Explore a variety of tattoo styles, discuss the artistry
              behind each piece, and find inspiration from the creativity that
              flows through our community.
            </p>
          </div>
          <div className="create-post-btn">
            <button onClick={clickVisibility}>
              <span>{openToWrite ? <HiMinus /> : <HiPlus />}</span>
              CREATE POST
            </button>
            <br />
            {message && <p>{message}</p>}
          </div>
        </div>
        {openToWrite && (
          <div className="write-post">
            <textarea
              value={post}
              onChange={changeHandler}
              placeholder="Share your thoughts..."
              rows="5"
            />
            <button onClick={submitHandler}>Post</button>
          </div>
        )}

        <div className="posts-section">
          <h2>All Posts</h2>
          <hr />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Forum;
