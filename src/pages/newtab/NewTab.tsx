import bgImg from "@/assets/image/bg/justHer.jpg";
import React from "react";
import { useImmer } from "use-immer";
import classNames from "classnames";
import { IconButton, Slider, styled } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

const bgImgHref = new URL(bgImg, import.meta.url).href;

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
    <NewTabWrapper>
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
              <div className="me-auto">
                <p>
                  <time className="text-xl">{date.toLocaleTimeString()}</time>
                </p>
                <p>
                  <time className="text-sm text-slate-600 dark:text-slate-300">
                    {date.toLocaleDateString()}
                  </time>
                </p>
              </div>
              <IconButton
                onClick={() => {
                  updateSettings((draft) => {
                    draft.isDark = !draft.isDark;
                  });
                }}
                className="flex items-center justify-center p-1 text-xl hover:text-blue-500"
              >
                <LightModeOutlined />
              </IconButton>
              <IconButton
                onClick={() => {
                  updateSettings((draft) => {
                    draft.showDrawer = !draft.showDrawer;
                  });
                }}
                className="flex items-center justify-center p-1 text-xl hover:text-red-500"
              >
                <DarkModeOutlined />
              </IconButton>
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
                      console.log(file);
                    }}
                    accept="image/*"
                    className="text-slate-500 file:rounded file:border-transparent file:bg-blue-500 file:text-white dark:text-slate-400"
                  />
                </fieldset>
                <fieldset className="space-y-1.5">
                  <label className="text-xs font-light uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Background Blur
                  </label>
                  <Slider
                    value={settings.blur}
                    onChange={(e, value) => {
                      void e;

                      if (typeof value !== "number") {
                        return;
                      }

                      updateSettings((draft) => {
                        draft.blur = value;
                      });
                    }}
                    valueLabelDisplay="auto"
                  />
                </fieldset>
                <fieldset className="space-y-1.5">
                  <label className="text-xs font-light uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Background Alpha
                  </label>
                  <Slider
                    value={settings.alpha}
                    onChange={(e, value) => {
                      void e;

                      if (typeof value !== "number") {
                        return;
                      }

                      updateSettings((draft) => {
                        draft.alpha = value;
                      });
                    }}
                    valueLabelDisplay="auto"
                  />
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ImgWrapper
        ref={bgRef}
        style={{
          filter: `blur(${(20 * deferredSettings.blur) / 100}px)`,
          inset: `calc(${deferredSettings.blur} * -2px)`,
        }}
      >
        <BackgroundImage
          src={bgImgHref}
          width={deferredSettings.width}
          height={deferredSettings.height}
          alt=""
        />
        <Backdrop
          style={{ backgroundColor: `rgb(0,0,0,${settings.alpha / 100})` }}
        />
      </ImgWrapper>
    </NewTabWrapper>
  );
}

const NewTabWrapper = styled("div")({
  position: "fixed",
  inset: 0,
  overflow: "hidden",
});
const ImgWrapper = styled("div")({
  position: "absolute",
  zIndex: -10,
});
const BackgroundImage = styled("img")({
  position: "absolute",
  zIndex: 10,
  inset: 0,
  inlineSize: "100%",
  blockSize: "100%",
  objectFit: "cover",
});
const Backdrop = styled("div")({
  position: "absolute",
  zIndex: 20,
  inset: 0,
});
