// Hooks Imports
import { useDocTitle } from "./use-doc-title";
import { useNprogress } from "./use-nprogress";
import { useAuthPage } from "./use-auth-page";

// API Imports
import { useLoginMe } from "@/hooks";

export function Component() {
  // Route Element
  const routeEl = useAuthPage();

  // ** Hooks
  useDocTitle();
  useNprogress();

  useLoginMe();

  return <>{routeEl}</>;
}
