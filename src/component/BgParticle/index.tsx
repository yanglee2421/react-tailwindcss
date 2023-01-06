import style from "./BgParticle.module.scss";
import { useClass, useResize } from "@/hook";
import { Particles } from "@/util";
import React, { useEffect, useRef, useState } from "react";
const cn = useClass(style);
/**
 * @function BgParticle 使用的类型
 */
namespace Type {
  export interface props
    extends React.PropsWithChildren,
      React.HTMLAttributes<HTMLDivElement> {
    particleNum?: number;
  }
}
/**
 * 粒子背景组件
 * @param props particleNum 粒子数，其余继承自 div
 * @returns JSX
 */
export function BgParticle(props: Type.props) {
  const { particleNum = 50, className = "", ...restProps } = props;
  const [box, setBox] = useState({ width: 0, height: 0 });
  const boxRef = useResize<HTMLDivElement>(({ width, height }) =>
    setBox((prev) => ({ ...prev, width, height }))
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = box.width;
    canvas.height = box.height;
    const particles = new Particles(canvas, particleNum);
    particles.animate();
    particles.bindEvent();
    return () => {
      particles.abortAnimate();
      particles.abortEvent();
    };
  }, [box, canvasRef]);
  return (
    <div {...restProps} ref={boxRef} className={cn("particle") + className}>
      <canvas ref={canvasRef} className={cn("particle-canvas")}></canvas>
      <div {...restProps} className={cn("particle-content") + className}>
        {props.children}
      </div>
    </div>
  );
}
