// Style Imports
import style from "./particle.module.scss";

// Hooks Imports
import { useResize } from "@/hooks";

// Utils Imports
import { Particles } from "@/utils";

// React Imports
import { useEffect, useRef } from "react";

export function Component() {
  const ctxRef = useRef<HTMLCanvasElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const size = useResize(resizeRef);

  useEffect(() => {
    if (!size) return;

    const [box] = size.contentBoxSize;

    const canvas = ctxRef.current;
    if (!canvas) return;

    Object.assign(canvas, {
      width: box.inlineSize,
      height: box.blockSize,
    });

    let p: null | Particles = null;
    const timer = setTimeout(() => {
      const particle = new Particles(
        canvas,
        (box.inlineSize / 1920) * 120,
        100
      );
      particle.animate();
      particle.bindEvent();
    }, 500);

    return () => {
      clearTimeout(timer);
      p?.abortAnimate();
      p?.abortEvent();
    };
  }, [size]);

  return (
    <div ref={resizeRef} className={style.partcle}>
      <canvas ref={ctxRef} className={style.particleCanvas}></canvas>
    </div>
  );
}
