// Hooks Imports
import { useDocTitle } from "./use-doc-title";
import { useNprogress } from "./use-nprogress";
import { useAuthPage } from "./use-auth-page";

export function Component() {
  // Route Element
  const routeEl = useAuthPage();

  // ** Hooks
  useDocTitle();
  useNprogress();

  return <>{routeEl}</>;
}
