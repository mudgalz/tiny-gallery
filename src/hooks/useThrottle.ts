import { useEffect, useRef, useState } from "react";

/**
 * A hook that throttles the given value to prevent it from changing too quickly.
 * It will only update the value if the given interval has passed since the last update.
 * @param value The value to throttle.
 * @param interval The interval in milliseconds to wait before updating the value.
 * @returns The throttled value.
 */
function useThrottle<T>(value: T, interval = 500): T {
  // The throttled value, which is the value that is actually returned.
  const [throttledValue, setThrottledValue] = useState<T>(value);

  // The timestamp of the last time the value was updated.
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    // The current timestamp.
    const now = Date.now();

    // If the given interval has passed since the last update, update the value.
    if (now >= lastExecuted.current + interval) {
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      // Otherwise, set a timer to update the value after the given interval.
      const timerId = setTimeout(() => {
        lastExecuted.current = now;
        setThrottledValue(value);
      }, interval);

      // Clean up the timer when the component is unmounted.
      return () => clearTimeout(timerId);
    }
  }, [value, interval]);

  return throttledValue;
}

export default useThrottle;
