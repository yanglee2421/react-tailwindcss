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
 * 返回一个 resizeRef 用于指定要监听的 DOM
 * callback 会在以下时机执行：
 * 1.组件挂载时
 * 2.DOM 的尺寸发生更改时
 * 组件移除时，会解除监听
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
