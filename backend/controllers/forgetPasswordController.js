import { generateJWT } from "../lib/jwt.js";
import User from "../model/user.js";
import transporter from "../mail-config/nodemailer.js";

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
    const resetUrl = `http://localhost:4000/reset-password/?id=${user._id}&token=${resetToken}`;

    console.log(user._id)
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
      .json({ message: "Reset password email sent successfully." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error." });
  }
};

//resetPassword

export const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "User not exists!" });
    }

    const secret = process.env.SECRET_KEY;

    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    await user.save();

    res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
