import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  getUserChatHistory,
  sendMessage,
} from "../controllers/chatController.js";

const router = Router();

router.get("/chat-history", auth, getUserChatHistory);
router.post("/send", auth, sendMessage);

export default router;
