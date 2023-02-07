import { useClass, useObject, useResize } from "@/hook";
import React, { useEffect, useReducer } from "react";
import style from "./style.module.scss";

export function PageMagnifier() {
  const cx = useClass(style);
  const [outer, setOuter] = useObject({ x: 0, y: 0 });
  const [inner, setInner] = useObject({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const resizeRef = useResize<HTMLDivElement>(
    (box) => setInner((prev) => Object.assign(prev, box)),
    []
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
export default React.memo(PageMagnifier);
