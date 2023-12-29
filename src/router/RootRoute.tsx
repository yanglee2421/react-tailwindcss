// NProgress Imports
import NProgress from "nprogress";

// Router Imports
import { useMatches, Navigate, useOutlet } from "react-router-dom";

// React Imports
import React from "react";

// Store Imports
import { useAuth } from "@/hooks/store";

// Acl Imports
import { defineAbilityFor, AclContext } from "@/configs/acl";

// Components Imports
import { HomeRoute } from "./HomeRoute";
import { LoginRoute } from "./LoginRoute";

export function RootRoute() {
  const outlet = useOutlet();
  const matches = useMatches();
  const [auth] = useAuth();
  const acl = React.useMemo(() => {
    return defineAbilityFor("");
  }, [auth.currentUser]);

  const routeNode = React.useMemo(() => {
    const currentRoute = matches[matches.length - 1];

    if (!currentRoute) return null;

    switch (Reflect.get(Object(currentRoute.handle), "auth")) {
      case "guest": {
        return auth.currentUser ? <HomeRoute /> : outlet;
      }

      case "none":
        return outlet;

      case "auth":
      default: {
        // Not logged in
        if (!auth.currentUser) {
          return <LoginRoute />;
        }

        // No access control
        if (
          acl.can(
            Reflect.get(Object(currentRoute.handle), "aclAction") || "read",
            Reflect.get(Object(currentRoute.handle), "aclSubject") || "fallback"
          )
        ) {
          return outlet;
        }

        return <Navigate to="/401" />;
      }
    }
  }, [matches, auth.currentUser, outlet, acl]);

  React.useEffect(() => {
    void matches;
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, [matches]);

  React.useEffect(() => {
    const currentRoute = matches[matches.length - 1];

    if (!currentRoute) return;

    const title = Reflect.get(Object(currentRoute.handle), "title");

    if (!title) return;

    if (typeof title === "string") {
      document.title = title;
    }
  }, [matches]);

  return <AclContext.Provider value={acl}>{routeNode}</AclContext.Provider>;
}
// ck_bc5124569889f94574e6fb878677c85db8300749
// cs_40da90a7ae05b183a5cdd59148254ecdbc817c01
