import { useEffect, useRef } from "react";
const useResize = <T extends HTMLElement>(
  callback: (width: number, height: number) => void
) => {
  const ref = useRef<T>(null);
  useEffect(() => {
    const dom = ref.current!;
    const { width, height } = dom.getBoundingClientRect();
    callback(width, height);
    const obverser = new ResizeObserver(
      ([
        {
          contentRect: { width, height },
        },
      ]) => {
        callback(width, height);
      }
    );
    obverser.observe(dom);
    return () => {
      obverser.unobserve(dom);
    };
  }, []);
  return [ref];
};
export default useResize;
