import express from "express";
import {
  getProfile,
  logout,
  registration,
  userLogin,
} from "../controllers/userController.js";
import storage from "../cloudinary-config/cloudinaryConfig.js";
import multer from "multer";
import { auth } from "../middleware/auth.js";
import { writeReviewToArtistProfile } from "../controllers/createReview.js";

const router = express.Router();

//uploading images

const upload = multer({ storage });

//form
router.post("/signup", upload.array("portfolio", 3), registration);

router.post("/login", userLogin);

router.get("/profile", auth, getProfile);

//review

router.post("/submit-review", auth, writeReviewToArtistProfile);

//logout
router.post("/user-logout", logout);

export default router;
