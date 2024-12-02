import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./database/database.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import contactRoutes from "./routes/contactRoute.js";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4000;

connectToDatabase();

app.use("/api", userRoutes);
app.use("/api", profileRoutes);
app.use("/api", contactRoutes);

app.listen(PORT, () => {
  console.log("Server is listening!", PORT);
});
