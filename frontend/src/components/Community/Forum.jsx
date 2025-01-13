import React, { useContext, useState } from "react";
import NavBar from "../NavBar";
import { HiMinus, HiPlus } from "react-icons/hi";
import { UserContext } from "../../context/ContextProvider";
import "../Community/forum.css";
import Footer from "../Footer";
import api from "../api";
import useGetPosts from "../../hooks/communitypost/useGetPosts";
import useGetComment from "../../hooks/communitypost/useGetComment";

const Forum = () => {
  const { user } = useContext(UserContext);
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");
  const [openToWrite, setOpenToWrite] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { postLists } = useGetPosts();
  const { comments } = useGetComment();

  //GET-All posts

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

  const submitHandler = async () => {
    try {
      await api.post("/api/post", { content: post });
      setPost("");
    } catch (error) {
      setError("Failed to create post!");
    }
  };

  const commentHandler = async (postId) => {
    await api.post("/api/comment", { content: comment, post: postId });
    setComment("");
  };

  const commentChangeHandler = (e) => {
    setComment(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 50)}px`;
  };

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

          {postLists.map((item, index) => (
            <div key={index}>
              <div className="post-info">
                <img src={item.author.profileImage} alt="" />
                <h3>{item.author.firstName}</h3>
              </div>
              <p>{item.content}</p>
              <button onClick={() => commentHandler(item._id)}>Comment</button>

              {comments.map((comment) => (
                <>{comment.author}</>
              ))}

              <div className="write-comment">
                <textarea
                  value={comment}
                  onChange={commentChangeHandler}
                  placeholder="Share your thoughts..."
                  rows="1"
                />
                <button onClick={() => commentHandler(item._id)}>Post</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Forum;
