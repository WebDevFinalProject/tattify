import React, { useContext, useState, useEffect } from "react";
import NavBar from "../NavBar";
import {
  HiArrowLeft,
  HiArrowRight,
  HiMinus,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import { UserContext } from "../../context/ContextProvider";
import "../Community/forum.css";
import Footer from "../Footer";
import api from "../api";
import useGetPosts from "../../hooks/communitypost/useGetPosts";
import useRenderingContent from "../../hooks/useRenderingContent";
import useDeletePost from "../../hooks/communitypost/useDeletePost";
import useLoadPagination from "../../hooks/useLoadPagination";
import { FaRegCommentAlt } from "react-icons/fa";
import { TbLoader } from "react-icons/tb";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { RiSendPlane2Fill } from "react-icons/ri";
import usePagination from "../../hooks/usePaginationHook";

const Forum = () => {
  const { user } = useContext(UserContext);
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");
  const [openToWrite, setOpenToWrite] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { postLists, setPostLists } = useGetPosts();
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentsData, setCommentsData] = useState({}); //store comments by postId
  const { renderMessageContent } = useRenderingContent();
  const delePost = useDeletePost();
  const [openMore, setOpenMore] = useState(false);

  const { visibleContent, handleLoadMore } = useLoadPagination();

  // Use pagination hook for posts
  const { currentItems, currentPage, totalPages, nextPage, prevPage } =
    usePagination(postLists, 5);

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

  //DELETE

  const deleteHandler = async (postId) => {
    try {
      if (
        !window.confirm(
          "Are you sure you want to delete? \n\nThis will permanently delete your post."
        )
      )
        return;

      await delePost(postId);
      setPostLists((prevPost) =>
        prevPost.filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.error("Error deleting the post");
    }
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
              placeholder={`Share your thought ${user.firstName}..`}
              rows="5"
            />

            <p
              onClick={submitHandler}
              style={{ color: post ? "#b31b1b" : "grey" }}
              disabled={!post}
            >
              Post
            </p>
          </div>
        )}

        <div className="posts-section">
          <h2>All Posts</h2>
          <hr />

          {currentItems.map((item, index) => (
            <div key={index} className="forum-posts">
              <div>
                <div className="post-info">
                  {user?._id === item.author._id && (
                    <>
                      <p
                        className="period"
                        onClick={() => setOpenMore(!openMore)}
                      >
                        <MdOutlineMoreHoriz size={25} />
                      </p>

                      <span
                        onClick={() => deleteHandler(item._id)}
                        className="delete-post-btn"
                      >
                        {openMore && <p>Delete</p>}
                      </span>
                    </>
                  )}

                  <img src={item.author.profileImage} alt="profile-image" />
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
                  {selectedPostId === item._id ? (
                    "Hide Comments"
                  ) : (
                    <>
                      {" "}
                      <FaRegCommentAlt /> Comments{" "}
                    </>
                  )}
                </button>
              </div>

              {selectedPostId === item._id && (
                <div className="comment-lists">
                  {commentsData[selectedPostId] &&
                  commentsData[selectedPostId].length > 0 ? (
                    commentsData[selectedPostId]
                      .slice(0, visibleContent[selectedPostId] || 3)
                      .map((comment, commentIndex) => (
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
                      ))
                  ) : (
                    <p>No comments yet.</p>
                  )}

                  {/* LOAD MORE */}
                  {commentsData[selectedPostId]?.length >
                    (visibleContent[selectedPostId] || 3) && (
                    <div
                      onClick={() => handleLoadMore(item._id)} // Load More for each post
                      className="load-comment"
                    >
                      <TbLoader size={15} /> Load more...
                    </div>
                  )}

                  <div className="write-comment">
                    {user && (
                      <textarea
                        value={comment}
                        onChange={commentChangeHandler}
                        placeholder="Write your comment"
                        rows="1"
                      />
                    )}
                    <div
                      onClick={() => commentHandler(item._id)}
                      style={{ color: comment ? "black" : "grey" }}
                    >
                      {comment && <RiSendPlane2Fill className="send-comment" />}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pagination-posts">
          <div onClick={prevPage} disabled={currentPage === 0}>
            <HiArrowLeft className="arrow-post" />
          </div>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <div onClick={nextPage} disabled={currentPage === totalPages - 1}>
            <HiArrowRight className="arrow-post" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Forum;
