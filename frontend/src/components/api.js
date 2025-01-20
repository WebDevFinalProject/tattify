import axios from "axios";

const api = axios.create({
  baseURL: "https://tattify.onrender.com",
  withCredentials: true,
});

export default api;
