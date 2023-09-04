// Styles Imports
import style from "./style.module.scss";
import clsx from "clsx";

// Antd Imports
import { Layout, Switch } from "antd";

// Hooks Imports
import { useResize } from "@/hooks";

// React Imports
import { useEffect, useMemo, useRef, useState } from "react";

// Assets Imports
import snowBg from "@/assets/image/bg/snow.jpg";
import villageBg from "@/assets/image/bg/snow-village.jpg";

// Utils Imports
import { Snow } from "@/utils";

export function Component() {
  const cvsRef = useRef<HTMLCanvasElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const size = useResize(resizeRef);

  useEffect(() => {
    if (!size) return;

    const [box] = size.contentBoxSize;

    const canvas = cvsRef.current;
    if (!canvas) return;

    Object.assign(canvas, { width: box.inlineSize, height: box.blockSize });

    let snow: null | Snow = null;
    const timer = setTimeout(() => {
      snow = new Snow(canvas, (box.inlineSize / 1920) * 200);
      snow.animate();
    }, 500);

    return () => {
      clearTimeout(timer);
      snow?.abortAnimate();
    };
  }, [size]);

  // 开关
  const [bg, setBg] = useState(false);
  const bgSwitch = useMemo(
    () => <Switch onChange={() => setBg((prev) => !prev)} checked={bg} />,
    [bg]
  );

  return (
    <Layout
      ref={resizeRef}
      className={clsx(["h-full", style.box])}
      style={{ backgroundImage: `url(${bg ? snowBg : villageBg})` }}
    >
      <canvas ref={cvsRef} className={style.ctx}></canvas>
      <div>{bgSwitch}</div>
    </Layout>
  );
}
