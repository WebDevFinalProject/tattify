import express from "express"
import { createArtistProfile, getArtistProfile } from "../controllers/profileController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/artists/profile",auth,createArtistProfile)
 router.get("/artists", auth, getArtistProfile)


 export default router