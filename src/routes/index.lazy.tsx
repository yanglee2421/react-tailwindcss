import { createLazyFileRoute } from "@tanstack/react-router";

import { Home } from "@/pages/home/Home";

export const Route = createLazyFileRoute("/")({
  component: Home,
});
