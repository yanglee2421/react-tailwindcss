import bgImg from "@/assets/image/bg/justHer.jpg";
import React from "react";
import { useImmer } from "use-immer";
import classNames from "classnames";
import { useIsDark } from "@/hooks/dom/useIsDark";

export function NewTab() {
  const [settings, updateSettings] = useImmer({
    width: 0,
    height: 0,
    blur: 0,
    alpha: 15,
    showDrawer: true,
    isDark: false,
  });
  const deferredSettings = React.useDeferredValue(settings);
  const [date, setDate] = React.useState(new Date());
  const [avator, setAvator] = React.useState("");

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

  React.useEffect(() => {
    let timer = 0;

    const play = () => {
      timer = requestAnimationFrame(play);
      setDate(new Date());
    };

    timer = requestAnimationFrame(play);

    return () => {
      cancelAnimationFrame(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        className={classNames(
          "absolute inset-y-0 w-96 transition-all",
          settings.showDrawer ? "end-0" : "-end-96",
        )}
      >
        <div className="h-full py-3 pe-3">
          <div className="paper h-full">
            {/* Header */}
            <div className="flex items-center gap-1.5 px-5 py-2">
              <div className="me-auto flex flex-col">
                <time className="text-xl">{date.toLocaleTimeString()}</time>
                <time className="text-sm text-slate-600 dark:text-slate-300">
                  {date.toLocaleDateString()}
                </time>
              </div>
              <button
                onClick={() => {
                  updateSettings((draft) => {
                    draft.isDark = !draft.isDark;
                  });
                }}
                className="flex items-center justify-center p-1 text-xl hover:text-blue-500"
              >
                <i
                  className={classNames(
                    "iconify",
                    settings.isDark
                      ? "fluent--weather-sunny-48-regular"
                      : "fluent--weather-moon-48-regular",
                  )}
                ></i>
              </button>
              <button
                onClick={() => {
                  updateSettings((draft) => {
                    draft.showDrawer = !draft.showDrawer;
                  });
                }}
                className="flex items-center justify-center p-1 text-xl hover:text-red-500"
              >
                <i className="iconify fluent--dismiss-48-regular"></i>
              </button>
            </div>

            {/* Main */}
            <div className="px-5 py-2">
              <table></table>
              <div className="space-y-3">
                <fieldset className="space-y-1.5">
                  <label className="text-xs font-light uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Background image
                  </label>
                  <input
                    type="file"
                    value={""}
                    onChange={(evt) => {
                      const file = evt.target.files?.item(0);

                      if (file) {
                        setAvator(URL.createObjectURL(file));
                      }
                    }}
                    accept="image/*"
                    className="text-slate-600 file:rounded file:border-transparent file:bg-blue-500 file:text-white dark:text-slate-500"
                  />
                </fieldset>
                <fieldset className="space-y-1.5">
                  <label className="text-xs font-light uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Background Blur
                  </label>
                  <input
                    type="range"
                    value={settings.blur}
                    onChange={(evt) => {
                      updateSettings((draft) => {
                        draft.blur = evt.target.valueAsNumber;
                      });
                    }}
                    className="block w-full border-0 accent-blue-500"
                  />
                </fieldset>
                <fieldset className="space-y-1.5">
                  <label className="text-xs font-light uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Background Alpha
                  </label>
                  <input
                    type="range"
                    value={settings.alpha}
                    onChange={(evt) => {
                      updateSettings((draft) => {
                        draft.alpha = evt.target.valueAsNumber;
                      });
                    }}
                    className="block w-full border-0 accent-blue-500"
                  />
                </fieldset>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-2">
              <div className="flex items-center gap-2">
                {/* <img
                  src={bgImgHref}
                  width={32}
                  height={32}
                  alt=""
                  className="object-cover"
                /> */}
                <div className="relative flex size-8 items-center justify-center rounded-full bg-gray-400">
                  <span className="tracking-wider text-white">YL</span>
                  {avator && (
                    <img
                      src={avator}
                      alt=""
                      onLoad={(evt) => {
                        URL.revokeObjectURL(evt.currentTarget.src);
                      }}
                      className="absolute inset-0 size-8 rounded-full object-cover invalid:hidden"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm">Yotu_Lee</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    hello world
                  </p>
                </div>
              </div>
            </div>

            {/* Login */}
            <form action="" className="space-y-4 px-5 py-2">
              <input type="email" className="block w-full" />
              <input type="password" className="block w-full" />
              <div>
                <button type="submit" className="btn-blue">
                  login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        ref={bgRef}
        className="absolute -z-10"
        style={{
          filter: `blur(${(20 * deferredSettings.blur) / 100}px)`,
          inset: `calc(${deferredSettings.blur} * -2px)`,
        }}
      >
        <img
          src={bgImgHref}
          width={deferredSettings.width}
          height={deferredSettings.height}
          alt=""
          className="absolute inset-0 z-10 size-full object-cover"
        />
        <div
          className={`absolute inset-0 z-20`}
          style={{ backgroundColor: `rgb(0,0,0,${settings.alpha / 100})` }}
        ></div>
      </div>
    </div>
  );
}

const bgImgHref = new URL(bgImg, import.meta.url).href;
