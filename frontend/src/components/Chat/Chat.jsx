import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/ContextProvider";
import { fetchChatHistory, sendMessage } from "../../api-chat/chatApi";
import socket from "../../utils-io/socket";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { user, isOpen, clickHandlerVisibility } = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const { id } = useParams();

  // Load chat history and set up socket
  useEffect(() => {
    if (!user) return;

    const loadChat = async () => {
      try {
        const history = await fetchChatHistory(user._id);

        // Combine all chats with the same participant into one unified chat
        const combinedChats = [];

        history.forEach((chat) => {
          const existingChat = combinedChats.find(
            (c) => c.participant._id === chat.participant._id
          );
          if (existingChat) {
            existingChat.messages.push(...chat.messages);
          } else {
            combinedChats.push({
              participant: chat.participant,
              messages: chat.messages,
            });
          }
        });

        setChats(combinedChats);
      } catch (error) {
        console.error(error);
      }
    };

    loadChat();

    socket.on("receive_message", (message) => {
      setChats((prev) =>
        prev.map((chat) =>
          chat.participant._id === message.sender._id
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
        )
      );
    });

    return () => {
      socket.off("receive_message");
    };
  }, [user]);

  // Handle sending message
  const messageHandler = async () => {
    if (!newMessage.trim()) return;

    const receiverId = /* user && id; */ currentChat?.participant._id;

    try {
      await sendMessage(user._id, receiverId, newMessage);
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
    setCurrentChat(chat);
  };

  return (
    <>
      {isOpen && (
        <div className="chat-window">
          <h2>Chat with Artist</h2>
          <div>
            {/* Display chat list */}
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

          {/* Display current chat messages */}
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
                        ? "You:" // Display "You" if the logged-in user is the sender
                        : `${msg.sender.firstName} ${msg.sender.lastName}:`}
                    </strong>
                    <span>{msg.content}</span>
                  </div>
                ))}
              </div>

              {/* Message input and send button */}
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={messageHandler}>Send</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chat;
