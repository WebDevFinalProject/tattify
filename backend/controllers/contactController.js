import contactModel from "../model/contact.js";
import transporter from "../mail-config/nodemailer.js";

export const createContact = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  try {
    const newContact = new contactModel({
      firstName,
      lastName,
      email,
      message,
    });

    await newContact.save();

    const mail = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Contact Form Submission",
      text: `NAME : ${firstName[0].toUpperCase() + firstName.slice(1)} ${
        lastName[0].toUpperCase() + lastName.slice(1)
      } \nEMAIL: ${email} \n\nMESSAGE: ${message}`,
    };

    await transporter.sendMail(mail);

    res
      .status(201)
      .json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while saving your message." });
  }
};
