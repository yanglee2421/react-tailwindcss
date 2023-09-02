// React Imports
import { useEffect, useState } from "react";

export function useIsDark() {
  // Prepare State
  const [isDark, setIsDark] = useState(() => {
    const { matches } = matchMedia("(prefers-color-scheme: dark)");
    return matches;
  });

  // Bind Change
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const mediaQuery = matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    mediaQuery.addEventListener(
      "change",
      (evt) => {
        setIsDark(evt.matches);
      },
      { signal }
    );

    // Clear Effect
    return () => {
      controller.abort();
    };
  }, [setIsDark]);

  return isDark;
}
