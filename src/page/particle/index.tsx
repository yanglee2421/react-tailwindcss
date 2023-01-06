import style from "./particle.module.scss";
import { NavLink } from "react-router-dom";
import { Button, Layout, Space } from "antd";
import { DarkSwitch, SignOut } from "@/component";
import { useClass, useResize } from "@/hook";
import { Particles } from "@/util";
import React, { useEffect, useRef, useState } from "react";
const cn = useClass(style);
/**
 * 粒子页面
 * @returns JSX
 */
export function PageParticle() {
  const [box, setBox] = useState({ width: 0, height: 0 });
  const resizeRef = useResize<HTMLDivElement>(({ width, height }) =>
    setBox((prev) => ({ ...prev, width, height }))
  );
  const canRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canRef.current!;
    canvas.width = box.width;
    canvas.height = box.height;
    const p = new Particles(canvas, 100, 120, "199, 199, 199");
    p.animate();
    p.bindEvent();
    return () => {
      p.abortAnimate();
      p.abortEvent();
    };
  }, [box, canRef]);
  return (
    <Layout
      ref={resizeRef}
      className={cn("partcle")}
    >
      <canvas
        ref={canRef}
        className={cn("particle-canvas")}
      ></canvas>
      <div className={cn("particle-content p-1")}>
        <Space>
          <Button>
            <NavLink to="/">Home</NavLink>
          </Button>
          <SignOut></SignOut>
          <DarkSwitch></DarkSwitch>
        </Space>
      </div>
    </Layout>
  );
}

export default React.memo(PageParticle);
