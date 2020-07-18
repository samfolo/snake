import {MutableRefObject, useEffect, useRef} from 'react';

export const mod = (target: number, boundary: number) =>
  ((target % boundary) + boundary) % boundary;

export type TUseInterval = (callback: () => any, delay?: number | null) => void;

export const useInterval: TUseInterval = (
  callback: () => any,
  delay = null
) => {
  const savedCallback: MutableRefObject<typeof callback | undefined> = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
