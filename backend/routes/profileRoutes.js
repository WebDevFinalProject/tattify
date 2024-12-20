import express from "express";
import {
  createArtistProfile,
  deleteArtistProfile,
  getArtistProfile,
  updateArtistProfile,
} from "../controllers/profileController.js";
import { auth } from "../middleware/auth.js";
import { publicProfile } from "../controllers/publicController.js";


const router = express.Router();

router.post("/artists/create-profile", auth, createArtistProfile);
router.get("/artists/profile", getArtistProfile); // artist cards
router.delete("/artists/:artistId", auth, deleteArtistProfile);
router.put("/artists/:id", auth, updateArtistProfile);

// more info about the artist during registration

router.get("/artist/profile/:id", publicProfile);

export default router;
