// get user history

import ChatModel from "../model/chat.js";
import mongoose from "mongoose";

export const getUserChatHistory = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const chats = await ChatModel.find({ participants: req.userId })
      .populate("participants", "firstName lastName profileImage role")
      .populate("messages.sender", "firstName lastName profileImage")
      .exec();

    // Aggregate chats by participant, merge messages for each person
    const aggregatedChats = chats.map((chat) => {
      const otherParticipant = chat.participants.find(
        (p) => p._id.toString() !== req.userId
      );
      return {
        participant: otherParticipant,
        messages: chat.messages,
      };
    });

    res.status(200).json(aggregatedChats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat history" });
  }
};

// messaging between users

export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    // Validate inputs
    if (!senderId || !receiverId || !content) {
      return res
        .status(400)
        .json({ error: "senderId, receiverId, and mcontent are required." });
    }

    // Convert senderId and receiverId to ObjectId
    const participants = [
      new mongoose.Types.ObjectId(senderId),
      new mongoose.Types.ObjectId(receiverId),
    ];

    // Create chat document
    const chat = new ChatModel({
      participants,
      messages: [
        {
          sender: new mongoose.Types.ObjectId(senderId),
          content: content, // Ensure the "content" field is provided
        },
      ],
    });

    await chat.save();

    res.status(201).json(chat);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: error.message });
  }
};
