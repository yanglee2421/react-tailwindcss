import { useStyle, useStructure, useResize } from "@/hooks";
import React from "react";
import style from "./style.module.scss";

export function Component() {
  const cx = useStyle(style);
  const [outer, setOuter] = useStructure({ x: 0, y: 0 });
  const [inner, setInner] = useStructure({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const resizeRef = useResize<HTMLDivElement>((box) =>
    setInner((prev) => Object.assign(prev, box))
  );

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
    <div ref={resizeRef} onMouseMove={boxHandler} className={cx("box")}>
      <div
        className={cx("outer")}
        style={{ transform: `translate(${outer.x}px, ${outer.y}px)` }}
      >
        <div
          className={cx("inner")}
          style={{
            width: inner.width,
            height: inner.height,
            transform: `translate(${inner.x}px, ${inner.y}px)`,
          }}
        ></div>
      </div>
    </div>
  );
}
