// React Imports
import React from "react";

// Router Imports
import { useMatches } from "react-router-dom";

export function useRouteTitle() {
  const matches = useMatches();

  return React.useEffect(() => {
    const match = matches[matches.length - 1];
    const title = Reflect.get(Object(match?.handle), "title");
    const isHasTitle = [title, typeof title === "string"].every(Boolean);

    if (isHasTitle) {
      document.title = title;
    }
  }, [matches]);
}
