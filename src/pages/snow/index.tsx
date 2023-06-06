import style from "./style.module.scss";
import { Layout, Switch } from "antd";
import { useStyle, useResize } from "@/hooks";
import { useMemo, useRef, useState } from "react";
import snowBg from "@/assets/image/bg/snow.jpg";
import villageBg from "@/assets/image/bg/snow-village.jpg";
import { Snow } from "@/utils";

export function Component() {
  const cx = useStyle(style);

  const cvsRef = useRef<HTMLCanvasElement>(null);
  const resizeRef = useResize<HTMLElement>((box) => {
    const canvas = cvsRef.current;
    if (!canvas) return;
    Object.assign(canvas, box);

    let snow: null | Snow = null;
    const timer = setTimeout(() => {
      const snow = new Snow(canvas, (box.width / 1920) * 200);
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
