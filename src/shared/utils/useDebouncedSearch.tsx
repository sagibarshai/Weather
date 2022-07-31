import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number) => {
     const [debouncedValue, setDebouncedValue] = useState(value);
     const [timerIsOut, setTimerIsOut] = useState(false);
     useEffect(() => {
          const handler = setTimeout(() => {
               setTimerIsOut(true);
               setDebouncedValue(value);
          }, delay);
          return () => {
               setTimerIsOut(false);
               clearTimeout(handler);
          };
     }, [value, delay, timerIsOut]);
     return { debouncedValue, timerIsOut };
};

export default useDebounce;
