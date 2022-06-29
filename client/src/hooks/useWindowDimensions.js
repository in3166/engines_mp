import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions(collapse) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  useEffect(() => {
    if (collapse) {
      handleResize();
      window.addEventListener('resize', handleResize);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [collapse]);

  return windowDimensions;
}
