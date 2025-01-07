import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  withCredentials: true, // Allow cookies for authentication
});

export default socket;
