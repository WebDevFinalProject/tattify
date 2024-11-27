import User from "../model/user.js";
import ArtistProfile from "../model/profile.js";

//create portfolio
export const createArtistProfile = async (req, res) => {
    const {
      bio,
      specialties,
      city,
      country,
      basePrice,
      certifications,
      languagesSpoken,
      studioLocation,
      pricingDetails,
      socialLinks,
    } = req.body;
  
    try {
      // Get the userId from the auth middleware (req.userId)
      const userId = req.userId;
  
      // Validate the user exists and has the role "artist"
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (user.role !== "artist") {
        return res.status(403).json({ message: "Only artists can create profiles." });
      }
  
      // Check if the artist already has a profile
      const existingProfile = await ArtistProfile.findOne({ user: userId });
      if (existingProfile) {
        return res.status(400).json({ message: "Artist profile already exists." });
      }
  
      // Create the new artist profile
      const artistProfile = await ArtistProfile.create({
        user: userId,  // Use the authenticated user's ID
        bio,
        specialties,
        city,
        country,
        basePrice,
        certifications,
        languagesSpoken,
        studioLocation,
        pricingDetails,
        socialLinks,
      });
  
      // Populate the `user` field before sending the response
      const populatedProfile = await artistProfile.populate("user", "firstName lastName email profileImage");
  
      return res.status(201).json({
        message: "Artist profile created successfully!",
        data: populatedProfile,
      });
    } catch (error) {
      console.error("Error creating artist profile:", error.message);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };




// Get all artists
export const getArtistProfile = async (req, res) => {
  try {
    const artists = await ArtistProfile.find().populate({
      path: "user",
      select: "firstName lastName email profileImage", // Select fields to include from User
      match: { role: "artist" }, // Ensure only users with the role "artist" are included
    });

    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching artists", error });
  }
};
