import User from "../model/user.js";
import Review from "../model/review.js";

export const writeReviewToArtistProfile = async (req, res) => {
  const { id, rating, comment } = req.body;
  console.log(id)

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

        // Ensure the reviews array exists or initialize it
        if (!artist.reviews) {
          artist.reviews = []; // Initialize the reviews array if it doesn't exist
        }

    const newReview = new Review({
      customer: req.userId,
      artist: id,
      rating,
      comment,
    });

    await newReview.save();
   console.log(newReview)
    artist.reviews.push(newReview.id);
    await artist.save();

    res
      .status(201)
      .json({ message: "Review submitted successfully", review: newReview });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
