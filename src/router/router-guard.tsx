// Hooks Imports
import { useDocTitle } from "./use-doc-title";
import { useNprogress } from "./use-nprogress";

// Login Imports
import { useLoginMe, useLogin } from "@/hooks";

// React Imports
import React from "react";

// Router Imports
import {
  useMatches,
  useSearchParams,
  Navigate,
  useOutlet,
} from "react-router-dom";
import { toIsInWl } from "./router-whitelist";

export function Component() {
  useLoginMe();
  useDocTitle();
  useNprogress();

  // Router Hooks
  const outlet = useOutlet();
  const matches = useMatches();
  const [searchParams] = useSearchParams();

  // Redux Hooks
  const { usr } = useLogin();

  const routeNode = React.useMemo(() => {
    const nextRoute = matches[matches.length - 1];
    if (!nextRoute) {
      console.error("Invalid nextRoute");
      return null;
    }

    // To Login
    const isToLogin = nextRoute.id === "login";
    if (isToLogin) {
      const returnURL = searchParams.get("returnURL") || "/";
      return usr ? <Navigate to={returnURL} replace /> : outlet;
    }

    // To Whitelist
    const isInWhitelist = toIsInWl(nextRoute.id);
    if (isInWhitelist) return outlet;

    // Has Logged
    if (usr) return outlet;

    // Not Logged
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("returnURL", nextRoute.pathname);
    const query = urlSearchParams.toString();
    const isGoHome = nextRoute.id === "home";
    const search = isGoHome ? void 0 : query;
    const to = { pathname: "/login", search };

    return <Navigate to={to} replace />;
  }, [outlet, matches, searchParams, usr]);

  return <>{routeNode}</>;
}
