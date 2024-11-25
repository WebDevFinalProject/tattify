import mongoose from "mongoose";
import "dotenv/config";

export const connectToDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database is running!");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
