import style from "./particle.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { useClass, useResize } from "@/hook";
import { Particles } from "@/util";
import { DarkSwitch, SignOut } from "@/component";
import { Button, Layout, Space } from "antd";
import { NavLink } from "react-router-dom";
const cn = useClass(style);
/**
 * 组件函数
 */
export function PageParticle() {
  const [box, setBox] = useState({ width: 0, height: 0 });
  const ref = useResize<HTMLDivElement>(({ width, height }) =>
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
      ref={ref}
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
