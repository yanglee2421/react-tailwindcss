import style from "./particle.module.scss";
import { NavLink } from "react-router-dom";
import { Button, Layout, Space } from "antd";
import { useStyle, useResize } from "@/hook";
import { Particles } from "@/util";
import React, { useRef } from "react";
/**
 * 粒子页面
 * @returns JSX
 */
export function PageParticle() {
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
    <Layout ref={resizeRef} className={cx("partcle")}>
      <canvas ref={ctxRef} className={cx("particle-canvas")}></canvas>
    </Layout>
  );
}

export default React.memo(PageParticle);
