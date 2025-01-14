import React, { useContext, useState, useEffect } from "react";
import NavBar from "../NavBar";
import { HiMinus, HiPlus } from "react-icons/hi";
import { UserContext } from "../../context/ContextProvider";
import "../Community/forum.css";
import Footer from "../Footer";
import api from "../api";
import useGetPosts from "../../hooks/communitypost/useGetPosts";
import useRenderingContent from "../../hooks/useRenderingContent";

const Forum = () => {
  const { user } = useContext(UserContext);
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");
  const [openToWrite, setOpenToWrite] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { postLists } = useGetPosts();
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentsData, setCommentsData] = useState({}); //store comments by postId
  const { renderMessageContent } = useRenderingContent();

  // Get comments when selectedPostId changes
  useEffect(() => {
    if (selectedPostId) {
      let interval;
      const fetchComments = async () => {
        try {
          const response = await api.get(`/api/comments/${selectedPostId}`);
          setCommentsData((prevState) => ({
            ...prevState,
            [selectedPostId]: response.data,
          }));
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };
      fetchComments();

      interval = setInterval(fetchComments, 1000);

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  }, [selectedPostId]); // Trigger when selectedPostId changes

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
      clickVisibility();
      setPost("");
    } catch (error) {
      setError("Failed to create post!");
    }
  };

  const commentHandler = async (postId) => {
    try {
      await api.post("/api/comment", { content: comment, post: postId });
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const commentChangeHandler = (e) => {
    setComment(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 50)}px`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
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
            <div key={index} className="forum-posts">
              <div>
                <div className="post-info">
                  <img src={item.author.profileImage} alt="" />
                  <div>
                    <h3>{item.author.firstName}</h3>
                    <p>Posted on : {formatDate(item.createdAt)}</p>
                  </div>
                </div>
                <p className="post-content">
                  {renderMessageContent(item.content)}
                </p>
                <button
                  onClick={() => {
                    // Toggle the selected post's visibility for comments
                    setSelectedPostId((prevId) =>
                      prevId === item._id ? null : item._id
                    );
                  }}
                  className="view-comments"
                >
                  {selectedPostId === item._id
                    ? "Hide Comments"
                    : "View Comments"}
                </button>
              </div>

              {selectedPostId === item._id && (
                <div className="comment-lists">
                  {commentsData[selectedPostId] &&
                  commentsData[selectedPostId].length > 0 ? (
                    commentsData[selectedPostId].map(
                      (comment, commentIndex) => (
                        <div key={commentIndex}>
                          <div className="comment-info">
                            <img src={comment.author.profileImage} alt="" />
                            <h5>{comment.author.firstName}</h5>
                          </div>
                          <p className="comment-content">
                            {" "}
                            {renderMessageContent(comment.content)}
                          </p>
                          <p className="date-commented">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>
                      )
                    )
                  ) : (
                    <p>No comments yet.</p>
                  )}

                  <div className="write-comment">
                    <textarea
                      value={comment}
                      onChange={commentChangeHandler}
                      placeholder="Write your comment"
                      rows="1"
                    />
                    <button onClick={() => commentHandler(item._id)}>
                      Post Comment
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Forum;
