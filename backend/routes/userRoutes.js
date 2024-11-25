import express from "express";
import { registration, userLogin } from "../controllers/userController.js";
import storage from "../cloudinary-config/cloudinaryConfig.js";
import multer from "multer";

const router = express.Router();

//uploading images

const upload = multer({ storage });

//form
router.post("/signup", registration);

router.post("/login", userLogin);

export default router;
