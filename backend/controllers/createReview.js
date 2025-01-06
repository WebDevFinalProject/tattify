import User from "../model/user.js";
import Review from "../model/review.js";
import ArtistProfile from "../model/profile.js";

export const writeReviewToArtistProfile = async (req, res) => {
  const { id, rating, comment } = req.body;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.role !== "customer") {
      return res
        .status(403)
        .json({ message: "Only customers can write a review." });
    }

    const artist = await User.findById(id);

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    // Find the artist's portfolio (ArtistProfile)
    const artistProfile = await ArtistProfile.findOne({ user: id });
    if (!artistProfile) {
      return res.status(404).json({ message: "Artist profile not found" });
    }

    const newReview = new Review({
      customer: req.userId,
      artist: id,
      rating,
      comment,
    });

    await newReview.save();
    artistProfile.reviews.push(newReview.id);
    await artistProfile.save();

    res
      .status(201)
      .json({ message: "Review submitted successfully", review: newReview });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
