import express from "express";
import {
  createArtistProfile,
  deactivateArtistProfile,
  getArtistProfile,
  updateArtistProfile,
} from "../controllers/profileController.js";
import { auth } from "../middleware/auth.js";
import { publicProfile } from "../controllers/publicController.js";
import { deleteImage } from "../controllers/deleteImageController.js";

const router = express.Router();

router.post("/artists/create-profile", auth, createArtistProfile);
router.get("/artists/profile", getArtistProfile); // artist cards
router.patch("/artists/:artistId", auth, deactivateArtistProfile);
router.put("/artists/:id", auth, updateArtistProfile);

//delete image in portfolio
router.patch("/:id/delete-image", auth, deleteImage);

// more info about the artist during registration

router.get("/artist/profile/:id", publicProfile);

export default router;
