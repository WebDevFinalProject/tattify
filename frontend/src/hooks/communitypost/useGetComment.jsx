import React, { useEffect, useState } from "react";
import api from "../../components/api";

const useGetComment = (postId) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await api.get(`/api/comments/${postId}`);
        setComments(res.data);
      } catch (error) {
        console.error("Cannot fetch the comments!");
      }
    };
    if (postId) fetchComment();
  }, [postId]);

  return { comments };
};

export default useGetComment;
