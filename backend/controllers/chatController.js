// get user history

import ChatModel from "../model/chat.js";

export const getUserChatHistory = async (req, res) => {
  try {
    const chats = await ChatModel.find({ participants: req.userId })
      .populate("participants", "firstName lastName profileImage role")
      .exec();

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat history" });
  }
};

// messaging between users

export const sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  try {
    let chat = await ChatModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = new ChatModel({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    chat.messages.push({ sender: senderId, content });

    await chat.save();

    res.status(201).json({ chat });
  } catch (error) {
    res.status(500).json({ message: "Error sending message" });
  }
};
