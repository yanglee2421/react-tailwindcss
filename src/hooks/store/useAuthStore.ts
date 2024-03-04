import { getAuth } from "firebase/auth";

import { create } from "zustand";

import { app } from "@/api/firebase/firebase";

import type { Auth} from "firebase/auth";

export const useAuthStore = create<AuthStore>((set, get) => {
  return {
    value: {
      auth: getAuth(app),
      updateCount: 0,
    },
    update() {
      return set({
        value: {
          auth: getAuth(app),
          updateCount: get().value.updateCount + 1,
        },
      });
    },
  };
});

export interface AuthStore {
  value: {
    auth: Auth;
    updateCount: number;
  };
  update(): void;
}
