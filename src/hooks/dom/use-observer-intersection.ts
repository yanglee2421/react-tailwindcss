// React Imports
import React from "react";

export function useObserverIntersection<TEl extends Element>(
  ref: React.RefObject<TEl>
) {
  // Prepare State
  const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(
    null
  );

  // Observer Element Effect
  React.useEffect(() => {
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
