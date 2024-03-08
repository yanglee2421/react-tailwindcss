import { useNavigate, useRouterState } from "@tanstack/react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { app } from "@/api/firebase/app";
import { useAuthStore } from "@/hooks/store/useAuthStore";

export function GuestGuard(props: Props) {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const authValue = useAuthStore((store) => store.value);
  const updateAuth = useAuthStore((store) => store.update);

  React.useEffect(() => {
    return onAuthStateChanged(getAuth(app), updateAuth);
  }, [updateAuth]);

  const logged = Boolean(authValue.auth.currentUser);

  React.useEffect(() => {
    if (logged) {
      const timer = setTimeout(() => {
        navigate({
          to: routerState.location.search.redirect_url || "/",
          search: {
            ...routerState.location.search,
            redirect_url: void 0,
          },
        });
      }, 16);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [logged, navigate, routerState.location.search]);

  if (logged) {
    return props.fallback;
  }

  return props.children;
}

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};
