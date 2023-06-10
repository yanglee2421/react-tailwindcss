import { useEffect, useRef } from "react";

/**
 * Hook for monitoring dom resize
 * @param callback Executed when dom is mounted and dom size changes
 * @returns ref used to specify dom
 */
export function useResize<T extends Element>(
  callback: (param: { width: number; height: number }) => void | Function
) {
  const resizeRef = useRef<T>(null);

  useEffect(() => {
    const dom = resizeRef.current;
    const isElement = dom instanceof Element;
    if (!isElement) throw new Error("resizeRef必须指向一个htmlelement");

    let clearFn: unknown;
    const obverser = new ResizeObserver((entries) => {
      const [{ contentBoxSize }] = entries;
      const [{ inlineSize: width, blockSize: height }] = contentBoxSize;

      // Clear Previos Resize Effect
      typeof clearFn === "function" && clearFn();
      clearFn = callback({ width, height });
    });
    obverser.observe(dom);

    // Clear Previos Effect
    return () => {
      typeof clearFn === "function" && clearFn();
      obverser.disconnect();
    };
  }, []);

  return resizeRef;
}
