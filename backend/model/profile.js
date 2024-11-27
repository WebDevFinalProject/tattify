import mongoose from "mongoose";

const artistProfileSchema = new mongoose.Schema({
  bio: {
    type: String,
    maxLength: 500, // Limit the bio to 500 characters
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // Reference to the user's profile image
    required: true,
  },
  specialties: {
    type: [String],
    required: true, // Array of strings for specialties
  },
  experience: {
    type: String,
  },
  certifications: {
    type: [String], // Array of strings for certifications
  },
  languagesSpoken: {
    type: [String], // Array of strings for spoken languages
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  studioLocation: {
    type: String,
  },
  basePrice: {
    type: Number, // Starting price per session/hour
  },
  pricingDetails: {
    type: String, // Additional details about pricing
  },
  socialLinks: {
    type: [String],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ArtistProfile = mongoose.model("ArtistPortfolio", artistProfileSchema);

export default ArtistProfile;
