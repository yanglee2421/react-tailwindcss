import { useEffect, useRef } from "react";

export function useResize<T extends HTMLElement>(
  callback: (params: { width: number; height: number }) => void
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const dom = ref.current;
    if (!(dom instanceof HTMLElement)) {
      throw new Error("useResize返回的ref必须指向一个html元素");
    }
    const obverser = new ResizeObserver(
      ([
        {
          contentBoxSize: [{ blockSize: height, inlineSize: width }],
        },
      ]) => {
        callback({ width, height });
      }
    );
    obverser.observe(dom);
    return () => {
      obverser.unobserve(dom);
      obverser.disconnect();
    };
  }, []);
  return ref;
}
