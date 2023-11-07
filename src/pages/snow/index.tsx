// Styles Imports
import style from "./style.module.scss";
import clsx from "clsx";

// Antd Imports
import { Layout, Switch } from "antd";

// Hooks Imports
import { useObserverResize } from "@/hooks";

// React Imports
import React from "react";

// Assets Imports
import snowBg from "@/assets/image/bg/snow.jpg";
import villageBg from "@/assets/image/bg/snow-village.jpg";

// Utils Imports
import { Snow } from "@/utils";

export function Component() {
  const cvsRef = React.useRef<HTMLCanvasElement>(null);
  const resizeRef = React.useRef<HTMLDivElement>(null);

  const size = useObserverResize(resizeRef);

  React.useEffect(() => {
    if (!size) return;

    const [box] = size.contentBoxSize;

    const canvas = cvsRef.current;
    if (!canvas) return;

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

  // Background switch
  const [bg, setBg] = React.useState(false);
  const bgSwitch = React.useMemo(() => {
    return <Switch onChange={() => setBg((prev) => !prev)} checked={bg} />;
  }, [bg, setBg]);

  return (
    <Layout
      ref={resizeRef}
      className={clsx(["h-full", style.box])}
      style={{ backgroundImage: `url(${bg ? snowBg : villageBg})` }}
    >
      <canvas
        ref={cvsRef}
        className={style.ctx}
        width={size?.contentBoxSize?.[0].inlineSize}
        height={size?.contentBoxSize[0].blockSize}
      ></canvas>
      <div>{bgSwitch}</div>
    </Layout>
  );
}
