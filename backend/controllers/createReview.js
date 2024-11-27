import User from "../model/user.js";
import ArtistProfile from "../model/profile.js";
import Review from "../model/review.js";

export const writeReviewToArtistProfile = async (req, res) => {
  const { artistId, rating, comment } = req.body;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.role !== "customer") {
      return res
        .status(403)
        .json({ message: "Only customers can write a reviews." });
    }

    const artist = await ArtistProfile.findById(artistId);

    if (!artist) {
      return res.status(404).json({ message: "Artist not found." });
    }

    const newReview = new Review({
      customer: req.userId,
      artist: artistId,
      rating,
      comment,
    });

    await newReview.save();
    artist.reviews.push(newReview._id);
    await artist.save();

    res
      .status(201)
      .json({ message: "Review submitted successfully", review: newReview });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
