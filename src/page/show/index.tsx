import style from "./show.module.scss";
import { Layout, Switch } from "antd";
import { useClass, useResize } from "@/hook";
import { Snow } from "@/util";
import React, { useEffect, useRef, useState } from "react";
import snowbg from "@/assets/image/snow-bg.jpg";
import villageBg from "@/assets/image/village.jpg";
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
    const number = box.width < 500 ? 24 : 100;
    const snow = new Snow(canvas, number);
    snow.animation();
    return () => snow.abortAnimation();
  }, [box]);
  const [bg, setBg] = useState(false);
  return (
    <Layout
      ref={resizeRef}
      className={cx("h-100 box")}
      style={{ backgroundImage: `url(${bg ? snowbg : villageBg})` }}
    >
      <canvas ref={ctxRef} className={cx("ctx")}></canvas>
      <div>
        <Switch onChange={(e) => setBg((prev) => !prev)} checked={bg} />
      </div>
    </Layout>
  );
}
export default React.memo(PageShow);
