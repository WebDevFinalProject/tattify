// USER-SCHEma

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "artist"],
    required: true,
  },
  portfolio: {
    type: String,
    required: function () {
      return this.role === "artist";
    },
  },

  profileImage: String,
});

const User = mongoose.model("Users", userSchema);
export default User;
