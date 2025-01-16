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

    function toCapitalize(a) {
      return a[0].toUpperCase() + a.slice(1).toLowerCase();
    }

    function toCapitalizeAnArray(a) {
      return a.map((a) => toCapitalize(a));
    }

    // Create the new artist profile
    const artistProfile = await ArtistProfile.create({
      user: userId, // Use the authenticated user's ID
      bio,
      specialties: toCapitalizeAnArray(specialties),
      city: toCapitalize(city),
      country,
      basePrice,
      certifications,
      languagesSpoken: toCapitalizeAnArray(languagesSpoken),
      studioLocation,
      pricingDetails,
      socialLinks,
    });

    // Update isProfileComplete to true

    await User.findByIdAndUpdate(userId, { isProfileComplete: true });

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
      .json({ message: "Something went wrong!", error: error.message });
  }
};

// Get all artists card
export const getArtistProfile = async (req, res) => {
  try {
    const { search, page = 1, limit = 9 } = req.query;

    const userFilter = search
      ? {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
          ],
          isActive: true, // Ensure only active users are included
        }
      : { isActive: true }; // Ensure only active users are included

    const userIds = await getUserIds(userFilter);

    const profileFilter = search
      ? {
          $or: [
            { city: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } },
            { user: { $in: userIds } }, // Get user IDs if search exists
          ],
        }
      : { user: { $in: userIds } }; // Ensure only profiles of active users are included

    const artists = await ArtistProfile.find(profileFilter)
      .populate({
        path: "user",
        select: "firstName lastName location portfolio profileImage",
        match: { role: "artist" }, // Ensure only users with the role "artist" are included
      })
      .limit(parseInt(limit)) // Limiting the number of results
      .skip((page - 1) * limit); // Skipping previous pages for pagination;

    // Get the total number of artists matching the filter
    const total = await ArtistProfile.countDocuments(profileFilter);

    res.status(200).json({
      artists,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
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
  const { id } = req.params;
  const {
    firstName,
    lastName,
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
    const artistProfile = await ArtistProfile.findOne({ user: id });

    if (!artistProfile) {
      return res.status(404).json({ message: "Artist profile not found." });
    }

    // Update the artist profile with the provided data
    artistProfile.bio = bio || artistProfile.bio;
    artistProfile.specialties = specialties || artistProfile.specialties;
    artistProfile.experience = experience || artistProfile.experience;
    artistProfile.certifications =
      certifications || artistProfile.certifications;
    artistProfile.languagesSpoken =
      languagesSpoken || artistProfile.languagesSpoken;
    artistProfile.city = city || artistProfile.city;
    artistProfile.country = country || artistProfile.country;
    artistProfile.studioLocation =
      studioLocation || artistProfile.studioLocation;
    artistProfile.basePrice = basePrice || artistProfile.basePrice;
    artistProfile.pricingDetails =
      pricingDetails || artistProfile.pricingDetails;
    artistProfile.socialLinks = socialLinks || artistProfile.socialLinks;
    artistProfile.isAvailable = isAvailable ?? artistProfile.isAvailable;

    artistProfile.updatedAt = Date.now();
    // Save the updated artist profile
    await artistProfile.save();

    // Optionally update user profile if needed
    const user = await User.findById(id);
    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      await user.save();
    }

    res.status(200).json(artistProfile);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

// Deactivate Artist Profile
export const deactivateArtistProfile = async (req, res) => {
  try {
    const { artistId } = req.params;
    // Check if the profile exists
    const artist = await User.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    // Ensure that only the artist or an admin can deactivate the profile
    if (artist.role !== "artist") {
      return res
        .status(403)
        .json({ message: "You are not authorized to deactivate this profile" });
    }

    // Deactivate the artist profile
    artist.isActive = false;
    await artist.save();

    res.status(200).json({ message: "Profile deactivated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deactivating profile", error });
  }
};
