// React Imports
import React from "react";

// Router Imports
import { useMatches } from "react-router-dom";

export function useDocTitle() {
  const matches = useMatches();

  return React.useEffect(() => {
    const curr = matches.at(-1);
    if (!curr) return;

    const { handle } = curr;
    const title = Reflect.get(Object(handle), "title");
    if (typeof title === "string") {
      document.title = title;
      return;
    }
  }, [matches]);
}
