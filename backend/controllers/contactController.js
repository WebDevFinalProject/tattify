import contactModel from "../model/contact.js";

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

    res
      .status(201)
      .json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while saving your message." });
  }
};
