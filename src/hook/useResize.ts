import { useEffect, useRef } from "react";
/**
 * 类型
 */
export namespace Type {
  export interface callback {
    (params: { width: number; height: number }): void;
  }
}
/**
 * 监听 dom resize 的钩子
 * @param callback 挂载、resize时执行
 * @returns 用于指定 dom 的 ref
 */
export function useResize<T extends HTMLElement>(callback: Type.callback) {
  const resizeRef = useRef<T>(null);
  useEffect(() => {
    const dom = resizeRef.current;
    if (!(dom instanceof HTMLElement)) {
      throw new Error("resizeRef必须指向一个html元素");
    }
    const obverser = new ResizeObserver(
      ([
        {
          contentBoxSize: [{ inlineSize: width, blockSize: height }],
        },
      ]) => callback({ width, height })
    );
    obverser.observe(dom);
    return () => {
      obverser.unobserve(dom);
      obverser.disconnect();
    };
  }, [resizeRef]);
  return resizeRef;
}
