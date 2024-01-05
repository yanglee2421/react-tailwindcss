// React Imports
import React from "react";

export function useIsDark() {
  return React.useSyncExternalStore(
    (trigger) => {
      mediaQuery.addEventListener("change", trigger);

      return () => {
        mediaQuery.removeEventListener("change", trigger);
      };
    },
    () => {
      return mediaQuery.matches;
    }
  );
}

const mediaQuery = matchMedia("(prefers-color-scheme: dark)");
