import { useEffect } from "react";

// Router Imports
import type { useMatches } from "react-router-dom";

type Matches = ReturnType<typeof useMatches>;

export function useDocTitle(matches: Matches) {
  return useEffect(() => {
    const curr = matches.at(-1);
    if (!curr) return;

    const handle: any = curr.handle;
    const title = handle?.title;
    if (typeof title !== "string") return;

    document.title = title;
  }, [matches]);
}
