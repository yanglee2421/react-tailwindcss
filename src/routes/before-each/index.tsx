import "./style.scss";

// Router Imports
import {
  useMatches,
  useOutlet,
  Navigate,
  useSearchParams,
} from "react-router-dom";

// React Imports
import { useMemo } from "react";

// Redux Imports
import { useAppSelector } from "@/redux";

// Config Imports
import { toIsInWl } from "@/routes/whitelist";

// Hooks Imports
import { useDocTitle, useNprogress } from "./hooks";

export function Component() {
  const outlet = useOutlet();
  const matches = useMatches();
  const [searchParams] = useSearchParams();
  const isLogined = useAppSelector((state) => state.login.isLogined);

  // Route Element
  const routeEl = useMemo(() => {
    const curr = matches.at(-1);
    if (!curr) throw new Error("no any route");

    // In Page Login
    const isInLogin = curr.id === "login";
    if (isInLogin) {
      const pathname = searchParams.get("redirect") || "/";
      return isLogined ? <Navigate to={{ pathname }} /> : outlet;
    }

    // In Whitelist
    const isInWl = toIsInWl(curr.id);
    if (isInWl) return outlet;

    // No Logged, Go Login
    if (!isLogined) {
      const urlSearchParams = new URLSearchParams(searchParams);
      urlSearchParams.set("redirect", curr.pathname);
      const search = urlSearchParams.toString();
      return <Navigate to={{ pathname: "/login", search }} />;
    }

    // ** Logged
    return outlet;
  }, [outlet, matches, searchParams, isLogined]);

  // ** Hooks
  useDocTitle(matches);
  useNprogress(matches);

  return <>{routeEl}</>;
}
