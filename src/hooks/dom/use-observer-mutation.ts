// React Imports
import React from "react";

export function useObserverMutation<TRef extends Element>(
  ref: React.RefObject<TRef>
) {
  // Prepare State
  const [record, setRecord] = React.useState<MutationRecord | null>(null);

  // Observer Element Effect
  React.useEffect(() => {
    const el = ref.current;
    const isElement = el instanceof Element;
    if (!isElement) {
      console.error("Excepted an element, got falsy!");
      return;
    }

    const observer = new MutationObserver(([record]) => {
      setRecord(record);
    });
    observer.observe(el);

    // Clear Effect
    return () => {
      observer.disconnect();
      setRecord(null);
    };
  }, [ref, setRecord]);

  return record;
}
