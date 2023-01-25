import style from "./particle.module.scss";
import { NavLink } from "react-router-dom";
import { Button, Layout, Space } from "antd";
import { DarkSwitch, SignOut } from "@/component";
import { useClass, useResize } from "@/hook";
import { Particles } from "@/util";
import React, { useRef } from "react";
const cx = useClass(style);
/**
 * 粒子页面
 * @returns JSX
 */
export function PageParticle() {
  const ctxRef = useRef<HTMLCanvasElement>(null);
  const resizeRef = useResize<HTMLDivElement>(
    (box) => {
      const canvas = ctxRef.current;
      if (!canvas) return;
      Object.assign(canvas, box);
      const number = (box.width / 1920) * 120;
      const p = new Particles(canvas, number, 100, "199, 199, 199");
      p.animate();
      p.bindEvent();
      return () => {
        p.abortAnimate();
        p.abortEvent();
      };
    },
    [ctxRef]
  );
  return (
    <Layout ref={resizeRef} className={cx("partcle")}>
      <canvas ref={ctxRef} className={cx("particle-canvas")}></canvas>
      <div className={cx("particle-content p-1")}>
        <Space>
          <NavLink to="/">
            <Button>Home</Button>
          </NavLink>
          <SignOut />
          <DarkSwitch />
        </Space>
      </div>
    </Layout>
  );
}

export default React.memo(PageParticle);
