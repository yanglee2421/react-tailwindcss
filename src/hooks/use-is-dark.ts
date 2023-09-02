// React Imports
import { useEffect, useState } from "react";

export function useIsDark() {
  // Prepare State
  const [isDark, setIsDark] = useState(() => {
    const queryDark = matchMedia("(prefers-color-scheme: dark)");
    return queryDark.matches;
  });

  // Bind Event
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const queryDark = matchMedia("(prefers-color-scheme: dark)");
    queryDark.addEventListener(
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
