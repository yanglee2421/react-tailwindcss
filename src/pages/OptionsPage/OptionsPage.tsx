import React from "react";
import { useSettingStore } from "@/hooks/store/useSettingStore";

export function OptionsPage() {
  const showMenus = useSettingStore((s) => s.showContextMenus);
  const setShowMenus = useSettingStore((s) => s.setShowContextMenus);

  const isPending = React.useSyncExternalStore(
    (onStoreChange) => useSettingStore.persist.onFinishHydration(onStoreChange),
    () => !useSettingStore.persist.hasHydrated(),
  );

  if (isPending) {
    return <p>loading...</p>;
  }

  return (
    <div className="flex">
      <aside className="w-96">aside</aside>
      <div>
        <header>header</header>
        <main>
          main
          <label>
            <input
              type="checkbox"
              checked={showMenus}
              onChange={(evt) => {
                setShowMenus(evt.target.checked);
              }}
            />
            show Menus
          </label>
        </main>
        <footer>footer</footer>
      </div>
    </div>
  );
}
