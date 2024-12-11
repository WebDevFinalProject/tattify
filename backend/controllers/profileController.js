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
      return res
        .status(403)
        .json({ message: "Only artists can create profiles." });
    }

    // Check if the artist already has a profile
    const existingProfile = await ArtistProfile.findOne({ user: userId });
    if (existingProfile) {
      return res
        .status(400)
        .json({ message: "Artist profile already exists." });
    }

    // Create the new artist profile
    const artistProfile = await ArtistProfile.create({
      user: userId, // Use the authenticated user's ID
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
    const populatedProfile = await artistProfile.populate(
      "user",
      "firstName lastName email profileImage"
    );

    return res.status(201).json({
      message: "Artist profile created successfully!",
      data: populatedProfile,
    });
  } catch (error) {
    console.error("Error creating artist profile:", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all artists
/* export const getArtistProfile = async (req, res) => {
  try {
    
    const artists = await ArtistProfile.find().populate({
      path: "user",
      select: "firstName lastName location portfolio profileImage", // Select fields to include from User
      match: { role: "artist" }, // Ensure only users with the role "artist" are included
    });

    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching artists", error });
  }
};  */



// Get all artists card
export const getArtistProfile = async (req, res) => {
  try {
    const { search } = req.query;
    const userFilter = search
      ? {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const profileFilter = search
      ? {
          $or: [
            { city: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } },
            { user: { $in: await getUserIds(userFilter) } }, // Get user IDs if search exists
          ],
        }
      : {};

    const artists = await ArtistProfile.find(profileFilter).populate({
      path: "user",
      select: "firstName lastName location portfolio profileImage",
      match: { role: "artist" }, // Ensure only users with the role "artist" are included
    });

    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching artists", error });
  }
};

// Helper function to get user IDs based on user filter
const getUserIds = async (filter) => {
  const users = await User.find(filter).select("_id");
  return users.map((user) => user._id);
};


//UPDATE ARTIST PROFILE
export const updateArtistProfile = async (req, res) => {
  const { artistId } = req.params;
  const {
    bio,
    specialties,
    experience,
    certifications,
    languagesSpoken,
    city,
    country,
    studioLocation,
    basePrice,
    pricingDetails,
    socialLinks,
    isAvailable,
  } = req.body;

  try {
    const artist = await ArtistProfile.findById(artistId);
    if (!artist) return res.status(404).json({ message: "Artist not found" });
    if (artist.user.toString() !== req.userId)
      return res.status(403).json({ message: "Unauthorized" });

    // Update fields dynamically
    const updatedFields = {
      bio,
      specialties,
      experience,
      certifications,
      languagesSpoken,
      city,
      country,
      studioLocation,
      basePrice,
      pricingDetails,
      socialLinks,
      isAvailable,
    };
    
    Object.keys(updatedFields).forEach((key) => {
      if (updatedFields[key] !== undefined) artist[key] = updatedFields[key];
    });

    await artist.save();
    res.status(200).json({ message: "Profile updated", artist });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

// Delete Artist Profile
export const deleteArtistProfile = async (req, res) => {
  try {
    const { artistId } = req.params;

    // Check if the profile exists
    const artist = await ArtistProfile.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    // Ensure that only the artist or an admin can delete the profile
    if (artist.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this profile" });
    }

    // Delete the artist profile
    await artist.deleteOne();
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error });
  }
};

export const searchArtistProfile = async (req, res) => {
  try {
    const { name, location } = req.query;

    const filter = {};
    if (name) {
      filter["user.firstName"] = name; // Exact match for name
    }
    if (location) {
      filter["user.location"] = location; // Exact match for location
    }

    // Fetch artists and populate user data
    const artists = await ArtistProfile.find(filter).populate({
      path: "user",
      select: "firstName lastName location portfolio profileImage",
      match: { role: "artist" },
    });

    res.status(200).json(artists); // Return the artists as JSON response
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error fetching artists" });
  }
};
