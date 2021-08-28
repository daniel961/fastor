import { useState, useEffect } from 'react';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const getScrollYposition = () => {
    return window.scrollY;
  };

  useEffect(() => {
    const handleScroll = () => setScrollPosition(getScrollYposition());

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};
