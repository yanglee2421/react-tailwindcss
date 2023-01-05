import { useClass, useResize } from "@/hook";
import React, { useEffect, useRef, useState } from "react";
import style from "./particle.module.scss";
import { Particles } from "@/util";
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
    const p = new Particles(canvas, {
      number: 150,
      lineMax: 120,
      color: "199, 199, 199",
    });
    p.animate();
    p.bindEvent();
    return () => {
      p.abortAnimate();
      p.abortEvent();
    };
  }, [box, canRef]);
  return (
    <div
      ref={ref}
      className={cn("partcle")}
    >
      <canvas
        ref={canRef}
        className={cn("particle-canvas")}
      ></canvas>
    </div>
  );
}
export default React.memo(PageParticle);
