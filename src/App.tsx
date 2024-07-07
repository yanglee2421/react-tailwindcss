import { QueryProvider } from "@/components/QueryProvider";
import React from "react";

export function App() {
  const page = React.useSyncExternalStore(
    (onStateChange) => {
      const observer = new MutationObserver(onStateChange);
      observer.observe(document.documentElement, {
        attributeFilter: ["data-page"],
        attributeOldValue: true,
        attributes: true,
        characterData: false,
        characterDataOldValue: false,
        childList: false,
        subtree: false,
      });

      return () => {
        return observer.disconnect();
      };
    },
    () => document.documentElement.dataset.page,
  );

  return <QueryProvider></QueryProvider>;
}
