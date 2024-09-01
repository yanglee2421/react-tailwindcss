import React from "react";
import { auth } from "@/api/firebase/app";

export function useCurrentUser() {
  return React.useSyncExternalStore(
    (onStateChange) => {
      return auth.onIdTokenChanged(onStateChange);
    },
    () => auth.currentUser,
    () => null,
  );
}
