import { useEffect, useRef, useState } from "react";

/**
 * @function useResizeObserver
 * @description A hook that returns a ref and the current width of the element the ref is attached to.
 * @param {Object} options - An object with the following properties:
 *  - {boolean} [options.initializeWithZero=false] - If true, the width will be initialized with 0.
 * @returns {Object} An object with the following properties:
 *  - {React.MutableRefObject<HTMLDivElement | null>} ref - A React ref that should be assigned to the element you want to observe.
 *  - {number | null} width - The current width of the element the ref is attached to.
 */
export default function useResizeObserver({
  initializeWithZero = false,
}: {
  initializeWithZero?: boolean;
} = {}): {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  width: number | null;
} {
  const [width, setWidth] = useState<number | null>(
    initializeWithZero ? 0 : null
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      if (entries[0].contentRect) {
        setWidth(entries[0].contentRect.width);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { ref, width };
}
