import mongoose from "mongoose";

//chat
// only for registered users
const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;
