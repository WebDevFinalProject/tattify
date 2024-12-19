import express from "express";
import { forgotPassword, getResetPassword, resetPassword } from "../controllers/forgetPasswordController.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);

// Use user ID instead of token in the URL
router.get('/reset-password/:userId', getResetPassword);

router.post("/reset-password/:userId", resetPassword);



export default router;
