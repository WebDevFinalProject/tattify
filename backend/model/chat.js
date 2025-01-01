import mongoose from "mongoose";

//MESSAGE-SCHEMA
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

//chat
// only for registered users
const chatSchema = new mongoose.Schema(
  {
    participants: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;
