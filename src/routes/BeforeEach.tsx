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
  console.log(matches);

  // return routing result
  const outlet = useOutlet();
  const route = useMemo(() => {
    const id = matches.at(-1)?.id || "";

    // Allow if the path is in the whitelist
    const isInWl = toIsInWl(id);
    if (isInWl) return outlet;

    // Allow if user is logged in
    if (isLogined) return outlet;

    // Otherwise jump to the login page
    return <Navigate to="/login" />;
  }, [outlet, matches, isLogined]);

  // title follows route
  useEffect(() => {
    const title = (matches.at(-1)?.handle as any)?.title;
    if (typeof title === "string") document.title = title;
  }, [matches]);

  return <>{route}</>;
}
