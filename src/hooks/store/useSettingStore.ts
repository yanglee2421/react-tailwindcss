import React from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useSettingStore = create(
  persist<SettingStore>(
    (set, get) => {
      return {
        showContextMenus: false,
        setShowContextMenus(action) {
          set({
            showContextMenus:
              typeof action === "function"
                ? action(get().showContextMenus)
                : action,
          });
        },
      };
    },
    {
      name: "useSettingStore",
      storage: createJSONStorage(() => {
        return {
          async getItem(key: string) {
            const record = await chrome.storage.sync.get(key);
            return record[key];
          },
          setItem(key: string, value: string) {
            return chrome.storage.sync.set({ [key]: value });
          },
          removeItem(key: string) {
            return chrome.storage.sync.remove(key);
          },
        };
      }),
    },
  ),
);

type SettingStore = {
  showContextMenus: boolean;
  setShowContextMenus: React.Dispatch<React.SetStateAction<boolean>>;
};
