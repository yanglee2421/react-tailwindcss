import { useEffect } from "react";

type Callback = (mediaQuery: MediaQueryList) => void;

/**
 * Hook for listening to browser theme changes
 * @param callback Executed when RC is mounted and browser theme is switched
 */
export function useDark(callback: Callback) {
  useEffect(() => {
    const queryDark = matchMedia("(prefers-color-scheme: dark)");
    callback(queryDark);
    const controller = new AbortController();
    const { signal } = controller;
    queryDark.addEventListener("change", () => callback(queryDark), { signal });
    return () => controller.abort();
  }, []);
}
