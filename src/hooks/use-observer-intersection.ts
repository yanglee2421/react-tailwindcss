// React Imports
import React, { useState, useEffect } from "react";

export function useObserverIntersection<TEl extends Element>(
  ref: React.RefObject<TEl>
) {
  // Prepare State
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  // Observer Element Effect
  useEffect(() => {
    const el = ref.current;
    const isElement = el instanceof Element;
    if (!isElement) {
      console.error("Excepted an element, got falsy!");
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    });
    observer.observe(el);

    // Clear Effect
    return () => {
      observer.disconnect();
      setEntry(null);
    };
  }, [ref, setEntry]);

  return entry;
}
