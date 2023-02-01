import { useEffect, useRef } from "react";

namespace t {
  export interface callback {
    (params: { width: number; height: number }): void | Function;
  }
}

/**
 * 监听 dom resize 的钩子
 * @param callback 挂载、resize时执行
 * @returns 用于指定 dom 的 ref
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
