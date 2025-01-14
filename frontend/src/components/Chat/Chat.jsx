import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/ContextProvider";
import { fetchChatHistory } from "../../api-chat/chatApi";
import socket from "../../utils-io/socket";
import "./chat.css";
import useChat from "../../hooks/chatCustomHook/useChat";
import useRenderingContent from "../../hooks/useRenderingContent";

const Chat = () => {
  const { user, isOpen, clickHandlerVisibility } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const { chats, currentChat, setCurrentChat } = useChat();
  const { renderMessageContent } = useRenderingContent();

  useEffect(() => {
    if (currentChat) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentChat?.messages]);

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

  const changeHandler = (e) => {
    setNewMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
  };

  const isSelfChat = currentChat?.participant._id === user._id;

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
                {!isSelfChat && (
                  <div className="chat-messages">
                    <h3>
                      <span>
                        {currentChat.participant.profileImage ? (
                          <img
                            src={currentChat.participant.profileImage}
                            alt={`${
                              currentChat.participant.firstName || "Participant"
                            } ${currentChat.participant.lastName || ""}`}
                            className="profile-chat-image"
                          />
                        ) : null}
                      </span>
                      {currentChat.participant.firstName ||
                      currentChat.participant.lastName
                        ? ` ${currentChat.participant.firstName} ${currentChat.participant.lastName}`
                        : "Start a conversation"}
                    </h3>
                  </div>
                )}

                <div className="messages">
                  {currentChat.messages.map((msg, index) => (
                    <>
                      {msg.sender._id !== user._id && (
                        <div className="message-header">
                          <img
                            src={msg.sender.profileImage} // Assuming profileImage is the URL of the sender's image
                            alt={`${msg.sender.firstName} ${msg.sender.lastName}`}
                            className="profile-pic"
                          />
                        </div>
                      )}
                      <div
                        key={index}
                        className={`message ${
                          msg.sender._id === user._id ? "sent" : "received"
                        }`}
                      >
                        <strong>
                          {msg.sender._id === user._id
                            ? "You:" // Display "You" if the logged-in user is the sender
                            : ` ${msg.sender.firstName} ${msg.sender.lastName}:`}
                        </strong>
                        <span>{renderMessageContent(msg.content)}</span>
                      </div>
                    </>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="message-input">
                  {!isSelfChat ? (
                    <>
                      <textarea
                        value={newMessage}
                        onChange={changeHandler}
                        placeholder="Type a message..."
                        rows="1"
                      />
                      <button onClick={messageHandler}>Send</button>
                    </>
                  ) : (
                    <p className="self-chat-warning">
                      Select a chat from your history.
                    </p>
                  )}
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
