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
    <div className="flex text-base">
      <aside className="absolute inset-x-0 inset-y-0 -start-full z-10 flex h-dvh w-72 flex-col border-e bg-white transition-all sm:sticky">
        <h2 className="border-b px-5 py-2 text-xl font-normal uppercase">
          aside
        </h2>
        <div className="flex-1 overflow-auto">
          <ul className="h-[1000px]"></ul>
        </div>
      </aside>
      <div className="flex-grow">
        <header className="sticky top-0 border-b bg-white px-5 py-2 text-xl uppercase">
          header
        </header>
        <main className="p-5">
          {/* <div className="h-[3000px]"></div> */}
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
          <div className="h-96"></div>
          <div className="h-96"></div>
          <div className="h-96"></div>
          <div className="h-96"></div>
        </main>
        <footer className="border-t px-5 py-2">footer</footer>
      </div>
    </div>
  );
}
