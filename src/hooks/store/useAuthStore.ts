// React Imports
import React from "react";

// Firebase Imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/api/firebase";

// Zustand Imports
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

export function useAuth() {
  const { updateAt, setUpdateAt } = useAuthStore(
    useShallow((store) => {
      return {
        updateAt: store.updateAt,
        setUpdateAt: store.setUpdateAt,
      };
    })
  );

  const auth = React.useMemo(() => {
    void updateAt;
    return getAuth(app);
  }, [updateAt]);

  React.useEffect(() => {
    return onAuthStateChanged(getAuth(app), () => {
      setUpdateAt(Date.now());
    });
  }, [setUpdateAt]);

  return [auth, setUpdateAt] as [typeof auth, typeof setUpdateAt];
}

export const useAuthStore = create<AuthStore>((set, get) => {
  return {
    updateAt: 0,
    setUpdateAt(action) {
      const updateAt = (() => {
        if (typeof action === "function") {
          return action(get().updateAt);
        }

        return action;
      })();

      return set({ updateAt });
    },
  };
});

export interface AuthStore {
  updateAt: number;
  setUpdateAt: React.Dispatch<React.SetStateAction<number>>;
}
