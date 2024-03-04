import { createLazyFileRoute } from "@tanstack/react-router";

import { Unauthorized } from "@/pages/401/Unauthorized";

export const route = createLazyFileRoute("/login")({
  component: Unauthorized,
});
