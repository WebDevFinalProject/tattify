import React, { useEffect } from "react";

const useStopScroll = (open) => {
  /* stop the background from scrolling */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);
};

export default useStopScroll;
