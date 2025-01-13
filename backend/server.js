import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./database/database.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import contactRoutes from "./routes/contactRoute.js";
import forgotPasswordRoutes from "./routes/forgetPasswordRoutes.js";
import { Server } from "socket.io";
import http from "http";
import { initializeSocket } from "./io/socket.js";
import chatRoute from "./routes/chatRoute.js";
import communityRoutes from "./routes/communityRoute.js";


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173", // The frontend URL
    credentials: true, // Allow credentials to be sent with the request
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4000;

//database connection
connectToDatabase();

//connect socket.io
initializeSocket(io);

//ROUTES
app.use("/api", userRoutes);
app.use("/api", profileRoutes);
app.use("/api", contactRoutes);
app.use("/api", forgotPasswordRoutes);
app.use("/api", chatRoute);
app.use("/api", communityRoutes)

server.listen(PORT, () => {
  console.log("Server is listening!", PORT);
});
