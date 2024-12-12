// customers

import bcrypt from "bcryptjs";
import User from "../model/user.js";
import { generateJWT } from "../lib/jwt.js";

//registration
export async function registration(req, res) {
  const { firstName, lastName, email, password, role } = req.body;
  try {
    if (!["artist", "customer"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists!" });
    }

    // handling the portfolio for artists

    let portfolio;

    if (role === "artist") {
      if (!req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({ error: "Portfolio is required for artists." });
      }
      portfolio = req.files.map((file) => file.path); // Cloudinary URLs
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      portfolio: role === "artist" ? portfolio : null,
    });

    await newUser.save();
    // res.status(201).send({ message: "User generated successfully!" });
    const token = generateJWT(newUser._id);

    res
      .cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(201)
      .json({
        message: "User generated successfully!",
      });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

//login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ msg: "Incorrect password!" });
    }
    const token = generateJWT(user._id);

    res
      .cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .json({
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
          portfolio: user.portfolio,
          isProfileComplete: user.isProfileComplete,
        },
        message: "Successfully logedIn!",
      });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    // Use req.userId from auth middleware
    const userProfile = await User.findById(req.userId).select("-password"); // Exclude password

    if (!userProfile) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(userProfile); // Send user profile
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// profile image upload
export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imgUrl = req.file.path;  // The URL of the uploaded image on Cloudinary
    const userId = req.userId;  // Assuming userId is available via auth middleware
    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage: imgUrl },  // Update the user's profile image URL
      { new: true }
    );

    res.json({
      imgUrl: user.profileImage,
      message: "Profile picture updated successfully!",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//LOGOUT

export const logout = (req, res) => {
  res
    .clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .status(200)
    .json({ message: "User logged out successfully!" });
};
