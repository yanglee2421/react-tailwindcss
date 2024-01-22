// Style Imports
import style from "./particle.module.scss";

// Hooks Imports
import { useObserverResize } from "@/hooks/dom";

// Utils Imports
import { Particles } from "@/utils";

// React Imports
import React from "react";

export function Component() {
  const ctxRef = React.useRef<HTMLCanvasElement>(null);
  const resizeRef = React.useRef<HTMLDivElement>(null);
  const size = useObserverResize(resizeRef);

  React.useEffect(() => {
    if (!size) return;

    const [box] = size.contentBoxSize;

    const canvas = ctxRef.current;
    if (!canvas) return;

    let p: null | Particles = null;
    const timer = setTimeout(() => {
      p = new Particles(canvas, (box.inlineSize / 1920) * 120, 100);
      p.animate();
      p.bindEvent();
    }, 500);

    return () => {
      clearTimeout(timer);
      p?.abortAnimate();
      p?.abortEvent();
    };
  }, [size]);

  return (
    <div ref={resizeRef} className={style.partcle}>
      <canvas
        ref={ctxRef}
        className={style.particleCanvas}
        width={size?.contentBoxSize?.[0].inlineSize}
        height={size?.contentBoxSize?.[0].blockSize}
      ></canvas>
    </div>
  );
}
