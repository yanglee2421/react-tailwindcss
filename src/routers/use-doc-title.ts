// React Imports
import { useEffect } from "react";

// Router Imports
import { useMatches } from "react-router-dom";

export function useDocTitle() {
  const matches = useMatches();

  return useEffect(() => {
    const curr = matches.at(-1);
    if (!curr) return;

    const handle: any = curr.handle;
    const title = handle?.title;
    if (typeof title !== "string") return;

    document.title = title;
  }, [matches]);
}
