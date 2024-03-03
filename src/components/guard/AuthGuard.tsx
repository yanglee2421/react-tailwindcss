import { useAuthStore } from "@/hooks/store/useAuthStore";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import React from "react";

export function AuthGuard(props: React.PropsWithChildren) {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const authValue = useAuthStore((store) => store.value);

  const currentUser = authValue.auth.currentUser;

  React.useEffect(() => {
    if (currentUser) {
      return;
    }

    navigate({
      to: "/login",
      search: {
        ...routerState.location.search,
        redirect_url: routerState.location.pathname,
      },
    });
  }, [currentUser]);

  if (currentUser) {
    return props.children;
  }

  return <>fallback</>;
}
