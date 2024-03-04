import { createRootRoute, Outlet } from "@tanstack/react-router";

import { NotFound } from "@/pages/404/NotFound";
import { InternalServerError } from "@/pages/500/InternalServerError";

export const Route = createRootRoute({
  component: Outlet,
  notFoundComponent: NotFound,
  errorComponent: InternalServerError,
});
