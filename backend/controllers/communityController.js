import { Comment, Post } from "../model/communitySchema.js";


// Post Controllers
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Get the logged-in user's ID (from the authentication middleware)
    const author = req.user.id;

    const post = new Post({ title, content, author });
    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "firstName lastName")
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getPostById = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate("author");
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Comment Controllers
export const createComment = async (req, res) => {
  try {
    const { content, post } = req.body;
    const author = req.user.id; // The logged-in user
    const comment = new Comment({ content, author, post });
    await comment.save();
    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate("author", "firstName lastName");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


