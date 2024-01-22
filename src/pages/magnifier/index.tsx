// Hooks Imports
import { useObserverResize } from "@/hooks/dom";
import { useImmer } from "use-immer";

// React Imports
import React from "react";

// Style Imports
import style from "./style.module.scss";

export function Component() {
  const [outer, setOuter] = useImmer({ x: 0, y: 0 });
  const [inner, setInner] = useImmer({
    x: 0,
    y: 0,
  });
  const resizeRef = React.useRef<HTMLDivElement>(null);
  const size = useObserverResize(resizeRef);

  const boxHandler = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;

    setOuter((prev) => {
      prev.x = offsetX - 150;
      prev.y = offsetY - 150;
    });
    setInner((prev) => {
      prev.x = -offsetX + 150;
      prev.y = -offsetY + 150;
    });
  };

  return (
    <div ref={resizeRef} onMouseMove={boxHandler} className={style.box}>
      <div
        className={style.outer}
        style={{ transform: `translate(${outer.x}px, ${outer.y}px)` }}
      >
        <div
          className={style.inner}
          style={{
            width: size?.contentBoxSize?.[0].inlineSize,
            height: size?.contentBoxSize?.[0].blockSize,
            transform: `translate(${inner.x}px, ${inner.y}px)`,
          }}
        ></div>
      </div>
    </div>
  );
}
