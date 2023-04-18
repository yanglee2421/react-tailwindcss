import style from "./style.module.scss";
import { Layout, Switch } from "antd";
import { useStyle, useResize } from "@/hooks";
import { BgFactory } from "@/utils";
import React, { useMemo, useRef, useState } from "react";
import snowBg from "@/assets/image/bg/snow.jpg";
import villageBg from "@/assets/image/bg/snow-village.jpg";

type Snow = ReturnType<InstanceType<typeof BgFactory>["snow"]>;

export default function PageSnow() {
  const cx = useStyle(style);

  const cvsRef = useRef<HTMLCanvasElement>(null);
  const resizeRef = useResize<HTMLElement>((box) => {
    const canvas = cvsRef.current;
    if (!canvas) return;
    Object.assign(canvas, box);

    let snow: null | Snow = null;
    const timer = setTimeout(() => {
      const bgFactory = new BgFactory(canvas);
      snow = bgFactory.snow(canvas, (box.width / 1920) * 200);
      snow.animate();
    }, 500);

    return () => {
      clearTimeout(timer);
      snow?.abortAnimate();
    };
  });

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
