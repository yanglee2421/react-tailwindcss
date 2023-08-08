// React Imports
import React, { useMemo } from "react";

// Router Imports
import {
  useMatches,
  useSearchParams,
  Navigate,
  useOutlet,
} from "react-router-dom";
import { toIsInWl } from "./router-whitelist";

// Redux Imports
import { useAppSelector } from "@/redux";

export function useAuthPage() {
  // Router Hooks
  const outlet = useOutlet();
  const matches = useMatches();
  const to = matches.at(-1);
  if (!to) throw new Error("invalid routes");

  const { id, pathname } = to;
  const isToLogin = id === "login";
  const isInWhitelist = toIsInWl(id);

  const [searchParams] = useSearchParams();

  // Redux Hooks
  const isLogged = useAppSelector((s) => s.login.islogged);

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
