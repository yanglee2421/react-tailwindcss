// Hooks Imports
import { useRouteTitle } from "./useRouteTitle";
import { useNProgress } from "./useNProgress";

// API Imports
import { useLoginMe, useLogin } from "@/hooks";

// Router Imports
import {
  useMatches,
  useSearchParams,
  Navigate,
  useOutlet,
} from "react-router-dom";
import { whitelist } from "./whitelist";

// React Imports
import React from "react";

// Acl Imports
import { useAcl } from "@/configs/acl";

export function RootRoute() {
  // Router Hooks
  const outlet = useOutlet();
  const matches = useMatches();
  const [searchParams] = useSearchParams();

  // Acl Hooks
  const acl = useAcl();

  // Login Hooks
  const { usr } = useLogin();

  const routeNode = React.useMemo(() => {
    const currentRoute = matches[matches.length - 1];

    if (!currentRoute) {
      console.error("currentRoute is falsy");

      return null;
    }

    // To Login
    if (currentRoute.id === "login") {
      const returnURL = searchParams.get("returnURL") || "/";

      return usr ? <Navigate to={returnURL} replace /> : outlet;
    }

    // To Whitelist
    if (whitelist.has(currentRoute.id)) {
      return outlet;
    }

    // Has Logged
    if (usr) {
      return acl.can("read", `page-${currentRoute.id}`) ? (
        outlet
      ) : (
        <Navigate to={"/401"} replace />
      );
    }

    // Not Logged
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("returnURL", currentRoute.pathname);
    const query = urlSearchParams.toString();
    const isGoHome = currentRoute.id === "home";
    const search = isGoHome ? void 0 : query;
    const to = { pathname: "/login", search };

    return <Navigate to={to} replace />;
  }, [matches, searchParams, outlet, usr, acl]);

  useNProgress();
  useRouteTitle();
  useLoginMe();

  return <>{routeNode}</>;
}
