// React Imports
import { useEffect } from "react";

// NProgress Imports
import NProgress from "nprogress";

// Router Imports
import { useMatches } from "react-router-dom";

export function useNprogress(matches: Matches) {
  return useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, [matches]);
}
type Matches = ReturnType<typeof useMatches>;
