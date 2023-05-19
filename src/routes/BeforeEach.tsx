import {
  useMatches,
  useOutlet,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import { useMemo, useEffect } from "react";
import { toIsInWl } from "./whiteList";
import { useAppSelector } from "@/redux";

/**
 * Routing authentication
 * @returns routing result
 */
export function BeforeEach() {
  const outlet = useOutlet();
  const matches = useMatches();
  const [searchParams] = useSearchParams();
  const isLogined = useAppSelector((state) => state.login.isLogined);

  // return routing result
  const route = useMemo(() => {
    const curr = matches.at(-1);
    if (!curr) throw new Error("no any route");

    // Current route is login
    const isInLogin = curr.id === "login";
    if (isInLogin) {
      const pathname = searchParams.get("redirect") || "/";
      return isLogined ? <Navigate to={{ pathname }} /> : outlet;
    }

    // Current route is in the whitelist
    const isInWl = toIsInWl(curr.id);
    if (isInWl) return outlet;

    // No logged, go login
    if (!isLogined) {
      const urlSearchParams = new URLSearchParams(searchParams);
      urlSearchParams.set("redirect", curr.pathname);
      const search = urlSearchParams.toString();
      return <Navigate to={{ pathname: "/login", search }} />;
    }

    // Logged
    return outlet;
  }, [outlet, matches, searchParams, isLogined]);

  // Title follows route
  useEffect(() => {
    const curr = matches.at(-1);
    if (!curr) return;

    const handle: any = curr.handle;
    const title = handle?.title;
    if (typeof title !== "string") return;

    document.title = title;
  }, [matches]);

  return <>{route}</>;
}
