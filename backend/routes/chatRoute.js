import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { getUserChatHistory } from "../controllers/chatController.js";

const router = Router();

router.get("/chat-history", auth, getUserChatHistory);

export default router;
