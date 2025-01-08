import axios from "axios";

export const fetchChatHistory = async () => {
  try {
    const res = await axios.get("http://localhost:4000/api/chat-history", {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    console.log(error)
  }
};

// sending

export const sendMessage = async (senderId, receiverId, content) => {
  try {
    const res = await axios.post(
      "http://localhost:4000/api/send",
      { senderId, receiverId, content },
      {
        withCredentials: true,
      }
    );

    return res;
  } catch (error) {
    console.error("Error sending message:", err);
  }
};
