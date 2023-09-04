// Hooks Imports
import { useStructure, useResize } from "@/hooks";

// React Imports
import React, { useEffect, useRef } from "react";

// Style Imports
import style from "./style.module.scss";

export function Component() {
  const [outer, setOuter] = useStructure({ x: 0, y: 0 });
  const [inner, setInner] = useStructure({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const resizeRef = useRef<HTMLDivElement>(null);
  const size = useResize<HTMLDivElement>(resizeRef);
  useEffect(() => {
    if (!size) return;

    const [box] = size.contentBoxSize;
    setInner((prev) => ({
      ...prev,
      width: box.inlineSize,
      height: box.blockSize,
    }));
  }, [setInner, size]);

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
            width: inner.width,
            height: inner.height,
            transform: `translate(${inner.x}px, ${inner.y}px)`,
          }}
        ></div>
      </div>
    </div>
  );
}
