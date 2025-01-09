// get user history

import ChatModel from "../model/chat.js";

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

