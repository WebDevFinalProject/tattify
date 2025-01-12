import React, { useContext, useEffect, useState } from "react";
import { fetchChatHistory } from "../../api-chat/chatApi";
import { UserContext } from "../../context/ContextProvider";
import socket from "../../utils-io/socket";
import { useParams } from "react-router-dom";

const useChat = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    if (!user) return;

    const loadChat = async () => {
      try {
        const history = await fetchChatHistory(user._id);

        const combinedChats = [];
        history.forEach((chat) => {
          const existingChat = combinedChats.find(
            (c) => c.participant._id === chat.participant._id
          );
          if (!existingChat) {
            combinedChats.push({
              participant: chat.participant,
              messages: chat.messages,
            });
          }
        });

        setChats(combinedChats);

        if (id) {
          const chat = combinedChats.find(
            (chat) => chat.participant._id === id
          );
          if (chat) {
            setCurrentChat(chat);
          } else {
            // If no chat exists, start a new conversation
            setCurrentChat({
              participant: { _id: id },
              messages: [],
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadChat();

    socket.on("receive_message", (message) => {
      setChats((prev) => {
        const updatedChats = prev.map((chat) =>
          chat.participant._id === message.sender._id
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
        );

        if (
          !updatedChats.some(
            (chat) => chat.participant._id === message.sender._id
          )
        ) {
          updatedChats.push({
            participant: message.sender,
            messages: [message],
          });
        }

        return updatedChats;
      });
    });

    return () => {
      socket.off("receive_message");
    };
  }, [user, id]);

  return { chats, setChats, currentChat, setCurrentChat };
};

export default useChat;
