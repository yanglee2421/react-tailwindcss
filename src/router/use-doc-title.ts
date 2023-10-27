// React Imports
import { useEffect } from "react";

// Router Imports
import { useMatches } from "react-router-dom";

export function useDocTitle() {
  const matches = useMatches();

  return useEffect(() => {
    const curr = matches.at(-1);
    if (!curr) return;

    const { handle } = curr;
    const title = Reflect.get(Object(handle), "title");
    if (typeof title !== "string") return;

    document.title = title;
  }, [matches]);
}
