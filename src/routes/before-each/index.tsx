// Router Imports
import {
  useMatches,
  useOutlet,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import { toIsInWl } from "@/routes/whitelist";

// React Imports
import { useMemo } from "react";

// Redux Imports
import { useAppSelector } from "@/redux";

// Hooks Imports
import { useDocTitle, useNprogress } from "./hooks";

export function Component() {
  // Router Hooks
  const outlet = useOutlet();
  const matches = useMatches();
  const [searchParams] = useSearchParams();

  // Redux Hooks
  const isLogined = useAppSelector((state) => state.login.isLogined);

  // Result Element
  const resultEl = useMemo(() => {
    const to = matches.at(-1);
    if (!to) throw new Error("no any route");

    // To Login
    const { id } = to;
    const isInLogin = id === "login";
    if (isInLogin) {
      const pathname = searchParams.get("redirect") || "/";
      return isLogined ? <Navigate to={{ pathname }} /> : outlet;
    }

    // ** Whitelist
    const isInWl = toIsInWl(id);
    if (isInWl) return outlet;

    // No Logged, Go Login
    if (!isLogined) {
      const urlSearchParams = new URLSearchParams(searchParams);
      urlSearchParams.set("redirect", to.pathname);
      const search = urlSearchParams.toString();
      return <Navigate to={{ pathname: "/login", search }} />;
    }

    // Has Logged
    return outlet;
  }, [outlet, matches, searchParams, isLogined]);

  // ** Hooks
  useDocTitle(matches);
  useNprogress(matches);

  return <>{resultEl}</>;
}
