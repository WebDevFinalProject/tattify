import api from "../../components/api";

export const fetchAllIds = async () => {
  const res = api.get("/api/users");
  return res.data;
};
