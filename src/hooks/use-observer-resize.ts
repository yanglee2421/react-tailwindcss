// React Imports
import React, { useEffect, useState } from "react";

export function useObserverResize<TRef extends Element>(
  elRef: React.RefObject<TRef>
) {
  // Prepare State
  const [entry, setEntry] = useState<ResizeObserverEntry | null>(null);

  // Bind Change
  useEffect(() => {
    const dom = elRef.current;
    const isElement = dom instanceof Element;
    if (!isElement) {
      console.error("Excepted an element, got falsy!");
      return;
    }

    const obverser = new ResizeObserver(([entry]) => {
      setEntry(entry);
    });
    obverser.observe(dom);

    // Clear Previos Effect
    return () => {
      obverser.disconnect();
      setEntry(null);
    };
  }, [elRef, setEntry]);

  return entry;
}
