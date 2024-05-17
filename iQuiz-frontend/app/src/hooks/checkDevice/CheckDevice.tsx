import { useState, useEffect } from 'react';

const useCheckDevice = (): number => {
  const isClient: boolean = typeof window === 'object'; 

  const [windowWidth, setWindowWidth] = useState<number>(isClient ? window.innerWidth : 0);

  useEffect((): (() => void) | void => {
    if (!isClient) {
      return;
    }

    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  return windowWidth;
}

export default useCheckDevice;
