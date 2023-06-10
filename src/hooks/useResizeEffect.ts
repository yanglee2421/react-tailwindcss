import { useEffect, useRef } from "react";

type Effect = (args: ResizeObserverSize) => unknown;

export function useResizeEffect<TRef extends Element>(effect: Effect) {
  const resizeRef = useRef<TRef>();

  useEffect(() => {
    const el = resizeRef.current;
    const isEl = el instanceof Element;
    if (!isEl) throw new Error("resizeRef must point to an Element");

    // Initialize Observer
    let onClearup: unknown;
    const obverser = new ResizeObserver((entries) => {
      const [{ contentBoxSize }] = entries;
      const [args] = contentBoxSize;

      // Clear Up Effect
      if (typeof onClearup === "function") onClearup();
      onClearup = effect(args);
    });

    // Start Observe
    obverser.observe(el);

    // Stop Observe
    return () => obverser.disconnect();
  }, []);

  return resizeRef;
}
