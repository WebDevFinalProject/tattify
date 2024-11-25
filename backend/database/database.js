import mongoose from "mongoose";

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
