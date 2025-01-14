import React, { useState } from "react";

const useLoadPagination = () => {
  const [visibleContent, setVisibleContent] = useState({});

  const handleLoadMore = (postId) => {
    setVisibleContent((prevState) => ({
      ...prevState,
      [postId]: (prevState[postId] || 3) + 3, // Increment visibility by 3 for the specific post
    }));
  };

  return { visibleContent, handleLoadMore };
};

export default useLoadPagination;
