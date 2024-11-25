// customers

import bcrypt from "bcryptjs";
import User from "../model/user.js";
import { generateJWT } from "../lib/jwt.js";

//registration
export async function registration(req, res) {
  const { firstName, lastName, email, password, role, portfolio } = req.body;
  try {
    if (!["artist", "customer"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    if (role === "artist" && !portfolio) {
      return res
        .status(400)
        .json({ error: "Portfolio is required for artists." });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists!" });
    }

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
    res.status(201).send({ message: "User generated successfully!" });
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
      .json({ user, message: "Successfully logedIn!" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
