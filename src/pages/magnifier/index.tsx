import React from "react";
import { useImmer } from "use-immer";
import style from "./style.module.scss";

export function Component() {
  const [state, updateState] = useImmer({
    outerX: 0,
    outerY: 0,
    innerX: 0,
    innerY: 0,
    width: 0,
    height: 0,
  });

  const resizeRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const resizeEl = resizeRef.current;

    if (!(resizeEl instanceof HTMLElement)) {
      return;
    }

    const observer = new ResizeObserver(([{ contentBoxSize }]) => {
      React.startTransition(() => {
        updateState((draft) => {
          const [size] = contentBoxSize;
          draft.width = size.inlineSize;
          draft.height = size.inlineSize;
        });
      });
    });

    observer.observe(resizeEl);

    return () => {
      observer.disconnect();
    };
  }, [updateState]);

  return (
    <div
      ref={resizeRef}
      onMouseMove={(e) => {
        const { offsetX, offsetY } = e.nativeEvent;

        updateState((draft) => {
          draft.outerX = offsetX - 150;
          draft.outerY = offsetY - 150;
          draft.innerX = 150 - offsetX;
          draft.innerY = 150 - offsetY;
        });
      }}
      className={style.box}
    >
      <div
        className={style.outer}
        style={{ transform: `translate(${state.outerX}px, ${state.outerY}px)` }}
      >
        <div
          className={style.inner}
          style={{
            width: state.width,
            height: state.height,
            transform: `translate(${state.innerX}px, ${state.innerY}px)`,
          }}
        ></div>
      </div>
    </div>
  );
}
