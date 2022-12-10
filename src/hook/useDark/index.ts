import { useEffect, useState } from "react";

export default (callback?: (mediaQuery: MediaQueryList) => void) => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const queryDark = matchMedia("(prefers-color-scheme: dark)");
    setIsDark(queryDark.matches);
    const controller = new AbortController();
    const { signal } = controller;
    queryDark.addEventListener(
      "change",
      () => {
        setIsDark(queryDark.matches);
        callback?.(queryDark);
      },
      { signal }
    );
  }, []);
  return isDark;
};
