import mongoose from "mongoose";
import "dotenv/config";

export const connectToDatabase = (callback) => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database is running!");

      if (!callback) return;
      callback();
    })
    .catch((err) => {
      console.log(err.message);
    });
};
