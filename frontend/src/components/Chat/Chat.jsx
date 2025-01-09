import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/ContextProvider";
import { fetchChatHistory } from "../../api-chat/chatApi";
import socket from "../../utils-io/socket";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { user } = useContext(UserContext); // Removed isOpen as we don't need to check visibility here
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [hasNewMessage, setHasNewMessage] = useState(false); // New state to trigger re-render
  const { id } = useParams();

  // Load chat history and set up socket
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
          if (!chat) {
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
      console.log("New message:", message);
      setChats((prev) =>
        prev.map((chat) =>
          chat.participant._id === message.sender._id
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
        )
      );
    });

    socket.on("receive_message", (message) => {
      setChats((prev) => {
        const updatedChats = prev.map((chat) =>
          chat.participant._id === message.sender._id
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
        );

        // Check if sender is in the current chat list
        if (
          !updatedChats.find(
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

  // Handle sending message
  const messageHandler = async () => {
    if (!newMessage.trim() || !currentChat) return;
    const receiverId = currentChat?.participant._id;

    try {
      socket.emit("send_message", {
        senderId: user._id,
        receiverId,
        content: newMessage,
      });

      setCurrentChat((prev) => ({
        ...prev,
        messages: [...prev.messages, { sender: user, content: newMessage }],
      }));

      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChatSelection = (chat) => {
    const room = `${user._id}_${chat.participant._id}`;
    socket.emit("join_room", room);

    setCurrentChat(chat);
  };

  return (
    <div className="chat-window">
      <h2>Chat with Artist</h2>
      <div>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat.participant._id}
              onClick={() => handleChatSelection(chat)}
            >
              <span>
                {chat.participant.firstName} {chat.participant.lastName}
              </span>
            </div>
          ))
        ) : (
          <p>No chat history available</p>
        )}
      </div>
      {currentChat && (
        <div>
          <h3>
            Chat with {currentChat.participant.firstName}{" "}
            {currentChat.participant.lastName}
          </h3>
          <div>
            {currentChat.messages.map((msg, index) => (
              <div key={index}>
                <strong>
                  {msg.sender._id === user._id
                    ? "You:"
                    : `${msg.sender.firstName} ${msg.sender.lastName}:`}
                </strong>
                <span>{msg.content}</span>
              </div>
            ))}
          </div>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={messageHandler}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Chat;
