import { useState, useEffect } from 'react';
import mobilePhone from '@images/mobile_phone.webp';
import exclamationMark from '@images/exclamation_mark.webp';

function getIsMobileLandscape() {
  return window.innerWidth < 1024 && window.innerHeight < window.innerWidth;
}

interface OrientationLockProps {
  children: React.ReactNode;
}

export default function OrientationLock(props: OrientationLockProps) {
  const { children } = props;

  const [isMobileLandscape, setIsMobileLandscape] = useState(() =>
    getIsMobileLandscape()
  );

  useEffect(() => {
    function handleResize() {
      setIsMobileLandscape(getIsMobileLandscape());
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  if (isMobileLandscape) {
    return (
      <div className="landscape">
        <img
          className="landscape__image landscape__image--animated"
          src={mobilePhone}
          alt="Mobile Phone"
          draggable={false}
        />
        <img
          className="landscape__image"
          src={exclamationMark}
          alt="Exclamation Mark"
          draggable={false}
        />
      </div>
    );
  }

  return children;
}
