// Hooks Imports
import { useDocTitle } from "./use-doc-title";
import { useNprogress } from "./use-nprogress";

// Login Imports
import { useLoginMe, useLogin } from "@/hooks";

// React Imports
import React from "react";

// Router Imports
import {
  useMatches,
  useSearchParams,
  Navigate,
  useOutlet,
} from "react-router-dom";
import { toIsInWhitelist } from "./to-is-in-whitelist";

export function Component() {
  useLoginMe();
  useDocTitle();
  useNprogress();

  // Router Hooks
  const outlet = useOutlet();
  const matches = useMatches();
  const [searchParams] = useSearchParams();

  // Redux Hooks
  const { usr, signIn } = useLogin();

  const routeNode = React.useMemo(() => {
    const nextRoute = matches[matches.length - 1];
    if (!nextRoute) {
      console.error("Invalid nextRoute");
      return null;
    }

    // To Login
    const isToLogin = nextRoute.id === "login";
    if (isToLogin) {
      const returnURL = searchParams.get("returnURL") || "/";
      return usr ? <Navigate to={returnURL} replace /> : outlet;
    }

    // To Whitelist
    const isInWhitelist = toIsInWhitelist(nextRoute.id);
    if (isInWhitelist) return outlet;

    // Has Logged
    if (usr) return outlet;

    // Not Logged
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("returnURL", nextRoute.pathname);
    const query = urlSearchParams.toString();
    const isGoHome = nextRoute.id === "home";
    const search = isGoHome ? void 0 : query;
    const to = { pathname: "/login", search };

    return <Navigate to={to} replace />;
  }, [matches, searchParams, outlet, usr]);

  React.useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      "message",
      (evt) => {
        if (allowOrigins.has(evt.origin)) {
          return;
        }

        const data = JSON.parse(evt.data);
        if (data.type !== "sso-login") {
          return;
        }

        signIn(
          {
            email: data.email,
            role: data.role,
            loginAt: data.loginAt,
          },
          data.rememberMe
        );
      },
      {
        signal: controller.signal,
      }
    );

    return () => {
      controller.abort();
    };
  }, [signIn]);

  return (
    <>
      {routeNode}
      <iframe
        src={import.meta.env.VITE_REACT_MUI_URL}
        style={{ display: "none" }}
      ></iframe>
    </>
  );
}

const allowOrigins = new Set<string>();
allowOrigins.add(import.meta.env.VITE_REACT_ANTD_URL);
allowOrigins.add(import.meta.env.VITE_REACT_MUI_URL);
allowOrigins.add(import.meta.env.VITE_VUE_ELE_URL);
