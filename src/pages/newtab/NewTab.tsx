import bgImg from "@/assets/image/bg/justHer.jpg";
import React from "react";
import { useImmer } from "use-immer";
import classNames from "classnames";
import { useIsDark } from "@/hooks/dom/useIsDark";

export function NewTab() {
  const [settings, updateSettings] = useImmer({
    width: 0,
    height: 0,
    opacity: 12,
    showDrawer: true,
    isDark: false,
  });

  const bgRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = bgRef.current;

    if (!el) {
      return;
    }

    const observer = new ResizeObserver(() => {
      React.startTransition(() => {
        updateSettings((draft) => {
          draft.width = el.clientWidth;
          draft.height = el.clientHeight;
        });
      });
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [updateSettings]);

  React.useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      "keydown",
      (evt) => {
        if (!evt.altKey) {
          return;
        }

        if (evt.key !== "w") {
          return;
        }

        updateSettings((draft) => {
          draft.showDrawer = !draft.showDrawer;
        });
      },
      {
        signal: controller.signal,
      },
    );

    return () => {
      controller.abort();
    };
  }, [updateSettings]);

  useIsDark();
  React.useEffect(() => {
    if (settings.isDark) {
      document.documentElement.classList.add("dark");

      return;
    }

    document.documentElement.classList.remove("dark");
  }, [settings.isDark]);

  return (
    <div className="relative h-dvh overflow-hidden">
      <div
        className={classNames(
          "absolute inset-y-0 w-96 transition-all",
          settings.showDrawer ? "end-0" : "-end-96",
        )}
      >
        <div className="h-full p-3">
          <div className="paper h-full divide-y">
            <div className="flex justify-end px-5 py-2">
              <button
                onClick={() => {
                  updateSettings((draft) => {
                    draft.isDark = !draft.isDark;
                  });
                }}
                className="m-3 flex items-center justify-center rounded-full text-2xl"
              >
                <i
                  className={classNames(
                    "iconify",
                    settings.isDark
                      ? "line-md--moon-alt-to-sunny-outline-loop-transition"
                      : "line-md--sunny-outline-to-moon-alt-loop-transition",
                  )}
                ></i>
              </button>
              <button
                onClick={() => {
                  updateSettings((draft) => {
                    draft.showDrawer = !draft.showDrawer;
                  });
                }}
                className="m-3 flex items-center justify-center rounded-full text-2xl transition-transform hover:rotate-180"
              >
                <i className="iconify line-md--close"></i>
              </button>
            </div>
            <div className="px-5 py-2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                expedita voluptatem tenetur, sed deleniti praesentium nihil
                consequuntur soluta rerum maiores qui a, harum ex aut. Omnis
                inventore quidem reiciendis totam.
              </p>
              <input
                type="range"
                value={settings.opacity}
                onChange={(evt) => {
                  updateSettings((draft) => {
                    draft.opacity = evt.target.valueAsNumber;
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={bgRef}
        className="absolute -z-10"
        style={{
          filter: `blur(${(20 * settings.opacity) / 100}px)`,
          inset: `calc(${settings.opacity} * -2px)`,
        }}
      >
        <img
          src={bgImgHref}
          width={settings.width}
          height={settings.height}
          alt=""
          className="absolute inset-0 z-10 size-full object-cover"
        />
        <div className="absolute inset-0 z-20 bg-black/25"></div>
      </div>
    </div>
  );
}

const bgImgHref = new URL(bgImg, import.meta.url).href;
