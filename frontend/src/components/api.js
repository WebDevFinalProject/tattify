import axios from "axios";
const registrationApi = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});
export default registrationApi;