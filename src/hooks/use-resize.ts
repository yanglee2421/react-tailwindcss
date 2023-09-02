// React Imports
import React, { useEffect, useState } from "react";

export function useResize<T extends Element>(elRef: React.RefObject<T>) {
  // Prepare State
  const [size, setSize] = useState<ResizeObserverEntry | null>(null);

  // Bind Change
  useEffect(() => {
    const dom = elRef.current;
    const isElement = dom instanceof Element;
    if (!isElement) {
      console.error("ref.current must be an Element");
      return;
    }

    const obverser = new ResizeObserver(([entry]) => {
      setSize(entry);
    });
    obverser.observe(dom);

    // Clear Previos Effect
    return () => {
      obverser.disconnect();
      setSize(null);
    };
  }, [setSize]);

  return size;
}
