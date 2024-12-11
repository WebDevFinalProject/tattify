import ArtistPortfolio from "../model/profile.js";
import User from "../model/user.js";

export const publicProfile = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const artistUser = await User.findById(id).select(
      "role firstName lastName profileImage portfolio"
    );

    if (!artistUser || artistUser.role !== "artist") {
      return res
        .status(404)
        .json({ message: "Artist not found or not an artist!" });
    }

    const artist = await ArtistPortfolio.findOne({ user: id })
      .populate("user", "firstName lastName profileImage")
      .populate({
        path: "reviews", // Populate the reviews and specific fields within reviews
        populate: {
          path: "customer", // Populate the customer reference in reviews
          select: "firstName",
        },
      })
      .select(
        "bio specialties experience certifications languagesSpoken city country studioLocation basePrice pricingDetails socialLinks isAvailable"
      );

    const reviews = artist.reviews.map((review) => ({
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      customer: {
        firstName: review.customer.firstName,
      },
    }));

    const response = {
      firstName: artist.user.firstName,
      lastName: artist.user.lastName,
      profileImage: artist.user.profileImage || null,
      bio: artist.bio,
      specialties: artist.specialties,
      experience: artist.experience,
      certifications: artist.certifications,
      languagesSpoken: artist.languagesSpoken,
      city: artist.city,
      country: artist.country,
      studioLocation: artist.studioLocation,
      basePrice: artist.basePrice,
      pricingDetails: artist.pricingDetails,
      socialLinks: artist.socialLinks,
      isAvailable: artist.isAvailable,
      portfolio: artistUser.portfolio,
      reviews: reviews,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
