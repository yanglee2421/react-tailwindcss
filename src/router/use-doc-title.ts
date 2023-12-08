// React Imports
import React from "react";

// Router Imports
import { useMatches } from "react-router-dom";

export function useDocTitle() {
  const matches = useMatches();

  return React.useEffect(() => {
    const match = matches[matches.length - 1];

    const title = Reflect.get(Object(match?.handle), "title");

    /**
     * Title is truth
     * Title is a string
     */
    const isHasTitle = [title, typeof title === "string"].every(Boolean);

    if (isHasTitle) {
      document.title = title;
    }
  }, [matches]);
}
