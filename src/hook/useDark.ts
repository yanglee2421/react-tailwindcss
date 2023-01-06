import { useEffect } from "react";
/**
 * 1. 挂载时：callback
 * 2. 主题切换时：callback
 */
export function useDark(callback: (mediaQuery: MediaQueryList) => void) {
  useEffect(() => {
    const queryDark = matchMedia("(prefers-color-scheme: dark)");
    callback(queryDark);
    const controller = new AbortController();
    const { signal } = controller;
    queryDark.addEventListener(
      "change",
      () => {
        callback(queryDark);
      },
      { signal }
    );
    return () => {
      controller.abort();
    };
  }, []);
}
