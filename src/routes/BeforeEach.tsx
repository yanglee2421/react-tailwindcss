import { useMatches, useOutlet, Navigate } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { toIsInWl } from "./whiteList";
import { useAppSelector } from "@/redux";

/**
 * Executed before every route change
 * @returns router result
 */
export function BeforeEach() {
  const matches = useMatches();
  const isLogined = useAppSelector((state) => state.login.isLogined);
  console.log(isLogined);

  // return routing result
  const outlet = useOutlet();
  const route = useMemo(() => {
    const curr = matches.at(-1);
    if (!curr) throw new Error("error in  BeforeEach");

    const isInLogin = curr.id === "login";
    if (isInLogin) return isLogined ? <Navigate to="/" /> : outlet;

    // If the path is in the whitelist, let it go
    const isInWl = toIsInWl(curr.id);
    if (isInWl) return outlet;

    // If not logged in, go login
    if (!isLogined) return <Navigate to="/login" />;

    // In other cases, let it go
    return outlet;
  }, [outlet, matches, isLogined]);

  // title follows route
  useEffect(() => {
    const title = (matches.at(-1)?.handle as any)?.title;
    if (typeof title === "string") document.title = title;
  }, [matches]);

  return <>{route}</>;
}
