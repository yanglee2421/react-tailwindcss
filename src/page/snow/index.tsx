import style from "./style.module.scss";
import { Layout, Switch } from "antd";
import { useClass, useResize } from "@/hook";
import { Snow } from "@/util";
import React, { useRef, useState } from "react";
import snowBg from "@/assets/image/snow-bg.jpg";
import villageBg from "@/assets/image/village.jpg";
const cx = useClass(style);
/**
 * @function PageShow 使用的类型
 */
export namespace Type {}
/**
 * Show 页面
 */
export function PageSnow() {
  const cvsRef = useRef<HTMLCanvasElement>(null);
  const resizeRef = useResize(
    (box) => {
      const canvas = cvsRef.current;
      if (!canvas) return;
      Object.assign(canvas, box);
      const number = (box.width / 1920) * 200;
      const snow = new Snow(canvas, number);
      snow.animate();
      return () => snow.abortAnimate();
    },
    [cvsRef]
  );
  const [bg, setBg] = useState(false);
  return (
    <Layout
      ref={resizeRef}
      className={cx("h-100 box")}
      style={{ backgroundImage: `url(${bg ? snowBg : villageBg})` }}
    >
      <canvas ref={cvsRef} className={cx("ctx")}></canvas>
      <div>
        <Switch onChange={() => setBg((prev) => !prev)} checked={bg} />
      </div>
    </Layout>
  );
}
export default React.memo(PageSnow);
