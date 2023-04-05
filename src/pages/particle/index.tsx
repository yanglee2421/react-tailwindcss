import style from "./particle.module.scss";
import { useStyle, useResize } from "@/hooks";
import { Particles } from "@/utils";
import React, { useRef } from "react";
/**
 * 粒子页面
 * @returns JSX
 */
export default function PageParticle() {
  const cx = useStyle(style);

  const ctxRef = useRef<HTMLCanvasElement>(null);
  const resizeRef = useResize<HTMLDivElement>((box) => {
    const canvas = ctxRef.current;
    if (!canvas) return;
    Object.assign(canvas, box);

    let p: null | Particles = null;
    const timer = setTimeout(() => {
      p = new Particles(canvas, (box.width / 1920) * 120, 100);
      p.animate();
      p.bindEvent();
    }, 500);

    return () => {
      clearTimeout(timer);
      p?.abortAnimate();
      p?.abortEvent();
    };
  });
  return (
    <div ref={resizeRef} className={cx("partcle")}>
      <canvas ref={ctxRef} className={cx("particle-canvas")}></canvas>
    </div>
  );
}
