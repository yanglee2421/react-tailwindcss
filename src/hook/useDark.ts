import { useEffect } from "react";
/**
 * 监听浏览器主题变化的钩子
 * @param callback 挂载、主题切换时执行
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
