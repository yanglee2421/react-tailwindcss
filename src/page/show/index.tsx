import style from "./show.module.scss";
import { Layout } from "antd";
import { useClass, useResize } from "@/hook";
import { Snow } from "@/util";
import React, { useCallback, useEffect, useRef, useState } from "react";
const cx = useClass(style);
/**
 * @function PageShow 使用的类型
 */
export namespace Type {}
/**
 * Show 页面
 */
export function PageShow() {
  const [box, setBox] = useState({ width: 0, height: 0 });
  const resizeRef = useResize(({ width, height }) =>
    setBox((prev) => ({ ...prev, width, height }))
  );
  const ctxRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ctxRef.current;
    if (!canvas) return;
    canvas.width = box.width;
    canvas.height = box.height;
    const snow = new Snow(canvas);
    snow.animation();
    return () => {
      snow.abortAnimation();
    };
  }, [box]);
  return (
    <Layout ref={resizeRef} className={cx("h-100 box")}>
      <canvas ref={ctxRef} className={cx("ctx")}></canvas>
    </Layout>
  );
}
export default React.memo(PageShow);
