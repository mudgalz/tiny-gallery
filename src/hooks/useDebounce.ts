import { useEffect, useState } from "react";

/**
 * A hook that debounces the given value to prevent it from updating too quickly.
 * It will only update the value after the given delay has passed since the last change.
 * @param value The value to debounce.
 * @param delay The delay in milliseconds to wait before updating the value.
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the delay period.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if the component unmounts or value/delay changes.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
