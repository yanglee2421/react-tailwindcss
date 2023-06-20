// React Imports
import { useEffect } from "react";

// NProgress Imports
import NProgress from "nprogress";

// Router Imports
import { useMatches } from "react-router-dom";

type Matches = ReturnType<typeof useMatches>;

export function useNprogress(matches: Matches) {
  return useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, [matches]);
}
