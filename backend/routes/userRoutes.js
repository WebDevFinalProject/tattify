import express from "express";
import {
  getProfile,
  logout,
  registration,
  uploadProfileImage,
  userLogin,
} from "../controllers/userController.js";
import storage from "../cloudinary-config/cloudinaryConfig.js";
import multer from "multer";
import { auth } from "../middleware/auth.js";
import { writeReviewToArtistProfile } from "../controllers/createReview.js";
import { addImages } from "../controllers/addImages.js";

const router = express.Router();

//uploading images

const upload = multer({ storage: storage });

//form
router.post("/signup", upload.array("portfolio", 3), registration);

// adding more images to the portfolio
router.post(
  "/user/portfolio/add",
  auth,
  upload.array("portfolio", 5),
  addImages
);

router.post("/login", userLogin);

router.get("/profile", auth, getProfile);

//UPLOAD => PROFILE image

router.post(
  "/profile-image",
  auth,
  upload.single("avatar"),
  uploadProfileImage
);

//review

router.post("/submit-review", auth, writeReviewToArtistProfile);

//logout
router.post("/user-logout", logout);

export default router;
