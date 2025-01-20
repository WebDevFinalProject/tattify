import { io } from "socket.io-client";

const socket = io("https://tattify.onrender.com", {
  path: '/socket.io',
  withCredentials: true,
});

export default socket;
