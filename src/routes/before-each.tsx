import {
  useMatches,
  useOutlet,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import { useMemo, useEffect } from "react";
import { toIsInWl } from "./whitelist";
import { useAppSelector } from "@/redux";

export function Component() {
  const outlet = useOutlet();
  const matches = useMatches();
  const [searchParams] = useSearchParams();
  const isLogined = useAppSelector((state) => state.login.isLogined);

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

    // Logged
    return outlet;
  }, [outlet, matches, searchParams, isLogined]);

  // Title Follow Route
  useEffect(() => {
    const curr = matches.at(-1);
    if (!curr) return;

    const handle: any = curr.handle;
    const title = handle?.title;
    if (typeof title !== "string") return;

    document.title = title;
  }, [matches]);

  return <>{routeEl}</>;
}
