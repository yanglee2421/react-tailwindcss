import { useEffect, useRef } from "react";

namespace t {
  interface param {
    width: number;
    height: number;
  }
  export interface callback {
    (param: param): void;
    (param: param): Function;
  }
}

/**
 * Hook for monitoring dom resize
 * @param callback Executed when dom is mounted and dom size changes
 * @returns ref used to specify dom
 */
export function useResize<T extends HTMLElement>(
  callback: t.callback,
  deps: React.DependencyList
) {
  const resizeRef = useRef<T>(null);

  useEffect(() => {
    const dom = resizeRef.current;
    if (!(dom instanceof HTMLElement))
      throw new Error("resizeRef必须指向一个htmlelement");

    let clearFn: Function | void;
    const obverser = new ResizeObserver(
      ([
        {
          contentBoxSize: [{ inlineSize: width, blockSize: height }],
        },
      ]) => {
        typeof clearFn === "function" && clearFn();
        clearFn = callback({ width, height });
      }
    );
    obverser.observe(dom);

    return () => {
      typeof clearFn === "function" && clearFn();
      obverser.unobserve(dom);
      obverser.disconnect();
    };
  }, [resizeRef, ...deps]);

  return resizeRef;
}
