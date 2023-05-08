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

  // return routing result
  const outlet = useOutlet();
  const route = useMemo(() => {
    return outlet;
    return <Navigate to="/login" replace />;
  }, [outlet, matches]);

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
