import { useMatches, useOutlet, Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux";
import { useMemo, useEffect } from "react";
import { whiteList } from "./whiteList";

/**
 * Executed before every route change
 * @returns router result
 */
export function BeforeEach() {
  const matches = useMatches();

  // Login status
  const auth = useAppSelector((state) => state.auth);

  // return routing result
  const outlet = useOutlet();
  const route = useMemo(() => {
    const isLogined = Boolean(auth.expiration);
    const pathname = matches.at(-1)?.pathname || "";
    if (pathname === "/login")
      return isLogined ? <Navigate to="/" replace /> : outlet;
    if (isInWl(pathname)) return outlet;
    if (isLogined) return outlet;
    return <Navigate to="/login" replace />;
  }, [auth, outlet, matches]);

  // title follows route
  useEffect(() => {
    const title = (matches.at(-1)?.handle as any)?.title;
    if (typeof title === "string") document.title = title;
  }, [matches]);

  return <>{route}</>;
}

function isInWl(path: string) {
  return whiteList.some((item) => path.startsWith(item));
}
