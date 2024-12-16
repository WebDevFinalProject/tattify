import User from "../model/user.js";

export const addImages = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.role !== "artist") {
      return res
        .status(403)
        .json({ message: "Only artists can add portfolio images." });
    }

    //file

    const newImages = req.files.map((file) => file.path);
    //append new images to the portfolio
    user.portfolio.push(...newImages);

    await user.save();

    res.status(200).json({
      message: "Portfolio images added successfully.",
      portfolio: user.portfolio,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
