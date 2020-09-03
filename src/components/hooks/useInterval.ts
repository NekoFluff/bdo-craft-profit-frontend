import React, { useEffect, useRef } from "react";

export function useInterval(callback: React.EffectCallback, delay: number) {
  const callbackRef = useRef(callback);
  const intervalRef = useRef<number>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(() => {
        callbackRef.current();
      }, delay);

      return () => {
        clearInterval(intervalRef.current);
      };
    }
  }, [delay]);

  return intervalRef;
}
