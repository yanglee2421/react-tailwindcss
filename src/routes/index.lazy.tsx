import { createLazyFileRoute } from "@tanstack/react-router";
import { Home } from "@/pages/home/Home";
import { AuthGuard } from "@/components/guard/AuthGuard";

export const Route = createLazyFileRoute("/")({
  component() {
    return (
      <AuthGuard>
        <Home />
      </AuthGuard>
    );
  },
});
