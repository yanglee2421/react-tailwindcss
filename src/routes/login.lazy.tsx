import { createLazyFileRoute } from "@tanstack/react-router";
import { Login } from "@/pages/login/Login";
import { GuestGuard } from "@/components/guard/GuestGuard";

export const Route = createLazyFileRoute("/login")({
  component() {
    return (
      <GuestGuard>
        <Login />
      </GuestGuard>
    );
  },
});
