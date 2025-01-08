import User from "../model/user.js";

export const deleteImage = async (req, res) => {
  const { id } = req.params;
  const { imageToDelete } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found!" });

    if (!user.portfolio.includes(imageToDelete)) {
      return res.status(400).json({ message: "Image not in portfolio!" });
    }

    user.portfolio = user.portfolio.filter((item) => item !== imageToDelete);

    await user.save();

    res.status(200).json({ message: "Image deleted successfully!", user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
