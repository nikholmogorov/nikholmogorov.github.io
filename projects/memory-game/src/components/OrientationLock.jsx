import { useState, useEffect } from "react";

import mobilePhone from "../assets/images/Mobile Phone.webp";
import exclamationMark from "../assets/images/Exclamation Mark.webp";

const OrientationLock = ({ children }) => {
  const getIsLandscape = () =>
    window.innerWidth > window.innerHeight && window.innerWidth < 1024;

  const [isLandscape, setIsLandscape] = useState(getIsLandscape());

  useEffect(() => {
    function handleResize() {
      setIsLandscape(getIsLandscape());
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  if (isLandscape) {
    return (
      <div className="landscape">
        <img className="landscape__image landscape__image--animated" src={mobilePhone} alt="Mobile Phone" width="" height="" loading="lazy"
          draggable="false" />
        <img className="landscape__image" src={exclamationMark} alt="Exclamation Mark" width="" height="" loading="lazy"
          draggable="false" />
      </div>
    );
  }

  return children;
};

export default OrientationLock;