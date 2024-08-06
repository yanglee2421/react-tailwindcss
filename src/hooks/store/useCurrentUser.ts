import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { app } from "@/api/firebase/app";

export function useCurrentUser() {
  return React.useSyncExternalStore(
    (onStateChange) => onAuthStateChanged(getAuth(app), onStateChange),
    () => getAuth(app).currentUser,
    () => null,
  );
}
