// NProgress Imports
import NProgress from "nprogress";

// Router Imports
import {
  useMatches,
  Navigate,
  useOutlet,
  useSearchParams,
} from "react-router-dom";

// React Imports
import React from "react";

// Store Imports
import { useAuthStore } from "@/hooks/store";
import { useShallow } from "zustand/react/shallow";

// Acl Imports
import { defineAbilityFor, AclContext } from "@/configs/acl";

// Firebase Imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/api/firebase";

// Components Imports
import { HomeRoute } from "./HomeRoute";
import { LoginRoute } from "./LoginRoute";
import { useTranslation } from "react-i18next";

export function RootRoute() {
  const matches = useMatches();
  const outlet = useOutlet();
  const { authValue, updateAuth } = useAuthStore(
    useShallow((store) => {
      return {
        authValue: store.value,
        updateAuth: store.update,
      };
    })
  );

  const acl = defineAbilityFor(authValue.auth.currentUser ? "admin" : "");

  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams({
    lang: "en",
  });
  const lang = searchParams.get("lang");

  React.useEffect(() => {
    if (typeof lang === "string") {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  React.useEffect(() => {
    return onAuthStateChanged(getAuth(app), () => {
      updateAuth();
    });
  }, [updateAuth]);

  React.useEffect(() => {
    NProgress.done();

    const destructor = () => {
      NProgress.start();
    };

    const currentRoute = matches[matches.length - 1];

    if (!currentRoute) {
      return destructor;
    }

    const title = Reflect.get(Object(currentRoute.handle), "title");

    if (!title) {
      return destructor;
    }

    if (typeof title === "string") {
      document.title = title;
    }

    return destructor;
  }, [matches]);

  return (
    <AclContext.Provider value={acl}>
      {(() => {
        const currentRoute = matches[matches.length - 1];

        if (!currentRoute) {
          return null;
        }

        const handle = currentRoute.handle || {};

        switch (Reflect.get(handle, "auth")) {
          case "none":
            return outlet;

          case "guest":
            if (authValue.auth.currentUser) {
              return <HomeRoute></HomeRoute>;
            }

            return outlet;

          case "auth":
          default:
            // Not logged in
            if (!authValue.auth.currentUser) {
              return <LoginRoute></LoginRoute>;
            }

            // Authorized pass
            if (
              acl.can(
                String(Reflect.get(handle, "aclAction") || "read"),
                String(Reflect.get(handle, "aclSubject") || "fallback")
              )
            ) {
              return outlet;
            }

            // Not authorized
            return <Navigate to="/403"></Navigate>;
        }
      })()}
    </AclContext.Provider>
  );
}
