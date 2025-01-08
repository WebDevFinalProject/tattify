import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  path: '/socket.io',
  withCredentials: true,
});

export default socket;
