import React, { useContext } from "react";
import blogsData from "./blogsData";
import { Link } from "react-router-dom";
import "./blogcard.css";
import ChatButton from "../Chat/ChatButton";
import { UserContext } from "../../context/ContextProvider";

const BlogCard = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="blog-page-container">
      <header className="blog-header">
        <h1>Latest Blog Articles</h1>
        <p>
          Explore our latest posts and stay informed with the latest trends.
        </p>
      </header>

      <div className="blog-cards-container">
        {blogsData.map((blog) => (
          <div key={blog.id} className="blog-card">
            <img src={blog.img} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <h2>{blog.title}</h2>
              <p>{blog.description}</p>

              <Link to={blog.path} className="blog-nav">
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
      {user && <ChatButton />}
    </div>
  );
};

export default BlogCard;
