import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // The user model, assuming this references customers
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ArtistPortfolio",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default ReviewModel;
