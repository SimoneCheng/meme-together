import { useLayoutEffect } from 'react';

const useScrollTo = (x = 0, y = 0) => {
  useLayoutEffect(() => {
    window.scrollTo(x, y);
  }, [x, y]);
};

export default useScrollTo;
