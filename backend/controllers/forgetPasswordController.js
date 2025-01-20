import { generateJWT } from "../lib/jwt.js";
import User from "../model/user.js";
import transporter from "../mail-config/nodemailer.js";
import bcrypt from "bcryptjs";

// Forget Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const resetToken = generateJWT(user._id);

    // Construct reset URL
    const resetUrl = `https://tattify-1.onrender.com/reset-password/${user._id}`;

   
    // Email message
    const message = `You requested a password reset. Click on this link to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`;

  
    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset Request",
      text: message,
    });

    res
      .status(200)
      .json({ message: "Email sent successfully." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error." });
  }
};


 // GET Reset Password Route (using userId)
export const getResetPassword = async (req, res) => {
  const { userId } = req.params; // Extract userId from the route

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User found. Proceed to reset password." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid user ID." });
  }
}; 

// Reset Password
export const resetPassword = async (req, res) => {
  const { userId } = req.params; // Extract userId from the route
  const { password } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};