import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./database/database.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import contactRoutes from "./routes/contactRoute.js";
import forgotPasswordRoutes from "./routes/forgetPasswordRoutes.js";

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // The frontend URL
  credentials: true,  // Allow credentials to be sent with the request
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4000;

connectToDatabase();

app.use("/api", userRoutes);
app.use("/api", profileRoutes);
app.use("/api", contactRoutes);
app.use("/api", forgotPasswordRoutes)

app.listen(PORT, () => {
  console.log("Server is listening!", PORT);
});
