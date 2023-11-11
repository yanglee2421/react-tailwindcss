// React Imports
import React from "react";

// Router Imports
import { useMatches } from "react-router-dom";

export function useDocTitle() {
  const matches = useMatches();

  return React.useEffect(() => {
    const match = matches[matches.length - 1];

    const title = Reflect.get(Object(match?.handle), "title");

    if (!title) return;
    if (typeof title === "string") {
      document.title = title;
      return;
    }
  }, [matches]);
}
