// React Imports
import React from "react";

// NProgress Imports
import NProgress from "nprogress";
// import "nprogress/nprogress.css";

// Router Imports
import { useMatches } from "react-router-dom";

export function useNprogress() {
  // Router Hooks
  const matches = useMatches();

  return React.useEffect(() => {
    void matches;
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, [matches]);
}
