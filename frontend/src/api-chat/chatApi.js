import axios from "axios";

export const fetchChatHistory = async () => {
  try {
    const res = await axios.get("https://tattify.onrender.com/api/chat-history", {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    console.log(error)
  }
};

