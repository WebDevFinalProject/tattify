import express from "express";
import {
  createComment,
  createPost,
  getAllPosts,
  getCommentsByPost,
  getPostById,
} from "../controllers/communityController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Post Routes
router.post("/post", auth, createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);

// Comment Routes
router.post("/comment", auth, createComment);
router.get("/comments/:postId", getCommentsByPost);

export default router;
