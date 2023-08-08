// React Imports
import React, { useMemo } from "react";

// Router Imports
import { useMatches, useSearchParams, Navigate } from "react-router-dom";
import { toIsInWhitelist } from "@/router/router-whitelist";

// Redux Imports
import { useAppSelector } from "@/redux";

export function useAuthPage(outlet: React.ReactNode) {
  // Router Hooks
  const matches = useMatches();
  const to = matches.at(-1);
  if (!to) throw new Error("invalid routes");
  const { id, pathname } = to;
  const isToLogin = id === "login";
  const isInWhitelist = toIsInWhitelist(id);

  const [searchParams] = useSearchParams();

  // Redux Hooks
  const isLogged = useAppSelector((s) => s.login.isLogged);

  return useMemo(() => {
    // To Login
    if (isToLogin) {
      const returnURL = searchParams.get("returnURL");
      const goPath = returnURL || "/";
      if (isLogged) return React.createElement(Navigate, { to: goPath });
      return outlet;
    }

    // To Whitelist
    if (isInWhitelist) return outlet;

    // Has Logged
    if (isLogged) return outlet;

    // Not Logged
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("returnURL", pathname);
    const search = urlSearchParams.toString();
    const to = { pathname: "/login", search };

    return React.createElement(Navigate, { to });
  }, [outlet, isToLogin, isInWhitelist, isLogged, pathname, searchParams]);
}
