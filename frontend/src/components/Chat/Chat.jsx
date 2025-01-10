import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/ContextProvider";
import { fetchChatHistory } from "../../api-chat/chatApi";
import socket from "../../utils-io/socket";
import { useParams } from "react-router-dom";
import "./chat.css";

const Chat = () => {
  const { user, isOpen, clickHandlerVisibility } = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const { id } = useParams();

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

  const messageHandler = async () => {
    if (!newMessage.trim() || !currentChat) return;
    const receiverId = currentChat.participant._id;

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

  const handleChatSelection = async (chat) => {
    setCurrentChat(chat);

    // Emit socket join for chat room
    const room = `${user._id}_${chat.participant._id}`;
    socket.emit("join_room", room);

    // Fetch chat history again if needed
    const history = await fetchChatHistory(user._id);
    const selectedChatHistory = history.find(
      (chatHistory) => chatHistory.participant._id === chat.participant._id
    );
    if (selectedChatHistory) {
      setCurrentChat(selectedChatHistory);
    } else {
      setCurrentChat({
        participant: chat.participant,
        messages: [],
      });
    }
  };

  return (
    <>
      {isOpen && (
        <div className="chat-popup-window">
          <div className="chat-header">
            <h2>Chat</h2>
            <button className="close-button" onClick={clickHandlerVisibility}>
              &times;
            </button>
          </div>

          <div className="chat-content">
            {/* Chat List */}
            <div className="chat-list">
              {chats.length > 0 ? (
                chats.map((chat) => (
                  <div
                    key={chat.participant._id}
                    onClick={() => handleChatSelection(chat)}
                    className={`chat-item ${
                      currentChat?.participant._id === chat.participant._id
                        ? "active"
                        : ""
                    }`}
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

            {/* Current Chat */}
            {currentChat && (
              <div className="chat-messages">
                <h3>
                  {currentChat.participant.firstName}{" "}
                  {currentChat.participant.lastName}
                </h3>
                <div className="messages">
                  {currentChat.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message ${
                        msg.sender._id === user._id ? "sent" : "received"
                      }`}
                    >
                      <strong>
                        {msg.sender._id === user._id
                          ? "You:" // Display "You" if the logged-in user is the sender
                          : `${msg.sender.firstName} ${msg.sender.lastName}:`}
                      </strong>
                      <span>{msg.content}</span>
                    </div>
                  ))}
                </div>

                <div className="message-input">
                  <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                  />
                  <button onClick={messageHandler}>Send</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
