import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // console.log("SCROLL TO TOP");
    window.scrollTo(0, 0);
  }, [location]);

  return <React.Fragment />;
};

export default ScrollToTop;
