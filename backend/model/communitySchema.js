import mongoose from "mongoose";

const communityPostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

const Post = mongoose.model("Posts", communityPostSchema);
const Comment = mongoose.model("Comments", commentSchema);

export { Post, Comment };
