import React from "react";
import blogsData from "./blogsData";
import { Link } from "react-router-dom";
import './blogcard.css'

const BlogCard = () => {
  return (
    <div className="blog-cards-container">
      {blogsData.map((blog) => (
        <div key={blog.id} className="blog-card">
          <img src={blog.img} alt={blog.title} className="blog-image" />
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
          <Link to={blog.path}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
