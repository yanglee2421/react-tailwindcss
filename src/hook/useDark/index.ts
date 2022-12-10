import { useEffect } from "react";

export default (callback?: (mediaQuery: MediaQueryList) => void) => {
  useEffect(() => {
    const queryDark = matchMedia("(prefers-color-scheme: dark)");
    callback?.(queryDark);
    const controller = new AbortController();
    const { signal } = controller;
    queryDark.addEventListener(
      "change",
      () => {
        callback?.(queryDark);
      },
      { signal }
    );
    return () => {
      controller.abort();
    };
  }, []);
};
