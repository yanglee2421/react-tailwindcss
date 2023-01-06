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
 * 0. resizeRef 指定 DOM
 * 1. 挂载时：callback
 * 2. DOM 尺寸更改时：callback
 * 3. 卸载时解除监听
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
