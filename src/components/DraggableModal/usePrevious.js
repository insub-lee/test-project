import { useRef, useEffect } from 'react';

export const usePrevious = value => {
  const ref = useRef;
  useEffect(() => {
    // @ts-ignore
    ref.current = value;
  });
  return ref.current;
};
