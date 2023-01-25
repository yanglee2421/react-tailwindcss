import { useEffect, useRef } from "react";
/**
 * @function useResize 使用的类型
 */
export namespace Type {
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
  callback: Type.callback,
  deps: React.DependencyList
) {
  const resizeRef = useRef<T>(null);
  useEffect(() => {
    const dom = resizeRef.current;
    if (!(dom instanceof HTMLElement)) {
      throw new Error("resizeRef必须指向一个html元素");
    }
    let clearFn: Function | void;
    const obverser = new ResizeObserver(
      ([
        {
          contentBoxSize: [{ inlineSize: width, blockSize: height }],
        },
      ]) => {
        if (typeof clearFn === "function") {
          clearFn();
        }
        clearFn = callback({ width, height });
      }
    );
    obverser.observe(dom);
    return () => {
      obverser.unobserve(dom);
      obverser.disconnect();
    };
  }, [resizeRef, ...deps]);
  return resizeRef;
}
