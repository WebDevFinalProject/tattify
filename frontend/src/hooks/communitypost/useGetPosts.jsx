import React, { useEffect, useState } from "react";
import api from "../../components/api";

const useGetPosts = () => {
  const [postLists, setPostLists] = useState([]);

  useEffect(() => {
    let interval;
    const getPosts = async () => {
      try {
        const res = await api.get("/api/posts");
        setPostLists(res.data);
      } catch (error) {
        console.error("Failed to fetch the posts");
      }
    };
    getPosts();
    interval = setInterval(getPosts, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);
  return { postLists };
};

export default useGetPosts;
