import style from "./style.module.scss";
import { Layout, Switch } from "antd";
import { useClass, useResize } from "@/hook";
import { Snow } from "@/util";
import React, { useMemo, useRef, useState } from "react";
import snowBg from "@/assets/image/snow-bg.jpg";
import villageBg from "@/assets/image/snow-village.jpg";

const cx = useClass(style);

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

      let snow: null | Snow = null;
      const timer = setTimeout(() => {
        snow = new Snow(canvas, (box.width / 1920) * 200);
        snow.animate();
      }, 500);

      return () => {
        clearTimeout(timer);
        snow?.abortAnimate();
      };
    },
    [cvsRef]
  );

  // 开关
  const [bg, setBg] = useState(false);
  const bgSwitch = useMemo(
    () => <Switch onChange={() => setBg((prev) => !prev)} checked={bg} />,
    [bg]
  );

  return (
    <Layout
      ref={resizeRef}
      className={cx("h-100 box")}
      style={{ backgroundImage: `url(${bg ? snowBg : villageBg})` }}
    >
      <canvas ref={cvsRef} className={cx("ctx")}></canvas>
      <div>{bgSwitch}</div>
    </Layout>
  );
}

export default React.memo(PageSnow);
