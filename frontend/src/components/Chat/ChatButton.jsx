import React, { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";
import "./chat.css";
import Chat from "./Chat";
import { HiMail } from "react-icons/hi";

const ChatButton = () => {
  const { user, clickHandlerVisibility, isOpen } = useContext(UserContext);

  return (
    <div className="chat-click-history">
      <button id="chat-button-history" onClick={clickHandlerVisibility}>
        <HiMail size={40} className="chat-icon" />
      </button>

      {isOpen && user && <Chat />}
    </div>
  );
};

export default ChatButton;
