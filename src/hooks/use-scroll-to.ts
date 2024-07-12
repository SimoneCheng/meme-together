import { useLayoutEffect } from 'react';

export const useScrollTo = (x = 0, y = 0) => {
  useLayoutEffect(() => {
    window.scrollTo(x, y);
  }, [x, y]);
};
