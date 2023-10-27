// React Imports
import { useEffect } from "react";

// NProgress Imports
import NProgress from "nprogress";
// import "nprogress/nprogress.css";

// Router Imports
import { useMatches } from "react-router-dom";

export function useNprogress() {
  // Router Hooks
  const matches = useMatches();

  return useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, [matches]);
}
