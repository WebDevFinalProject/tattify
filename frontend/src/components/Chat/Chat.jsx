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

  useEffect(() => {
    const loadChat = async () => {
      try {
        const history = await fetchChatHistory(user._id);
        if (history?.data) {
          setChats(history.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      loadChat();
    }

    /* SOCKET */

    socket.on("receive_message", (message) => {
      setChats((prev) =>
        prev.map((chat) =>
          chat._id === message.chatId
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
        )
      );
    });

    return () => {
      socket.off("receive_message");
    };
  }, [user]);

  // SENDING-MESSAGES

  const messageHandler = async () => {
    if (!newMessage.trim()) return;

    const receiverId = user && user?._id === id;

    try {
      await sendMessage(user._id, receiverId, newMessage);
      socket.emit("send_message", {
        senderId: user._id,
        receiverId,
        content: newMessage,
      });
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
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
                  key={chat._id}
                  onClick={() => setChats([chat])}
                  style={{ cursor: "pointer", margin: "10px 0" }}
                >
                  {chat.participants
                    .filter((p) => p._id !== user._id)
                    .map((p) => (
                      <span key={p._id}>
                        {p.firstName} {p.lastName}
                      </span>
                    ))}
                </div>
              ))
            ) : (
              <p>No chat history available</p>
            )}
          </div>
          <div>
            <div>
              {/* Message input and send button */}
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={messageHandler}>Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
