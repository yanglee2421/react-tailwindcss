import { useClass } from "@/hook";
import React, { useEffect, useRef, useState } from "react";
import style from "./particle.module.scss";
import { useResize } from "@/hook";
import Particle from "./class-particle";
const cn = useClass(style);
namespace type {
  export interface props
    extends React.PropsWithChildren,
      React.HTMLAttributes<HTMLDivElement> {
    particleNum?: number;
  }
}
const BgParticle = (props: type.props) => {
  const { particleNum = 50, className = "", ...restProps } = props;
  console.log(restProps);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const [boxRef] = useResize<HTMLDivElement>(({ width, height }) => {
    setBox((prev) => ({ ...prev, width, height }));
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = box.width;
    canvas.height = box.height;
    Particle.canvas = canvas;
    Particle.generate(particleNum);
    Particle.animate();
    Particle.bindEvent();
    return () => {
      Particle.clear();
      Particle.stopAnimate();
      Particle.abortEvent();
    };
  }, [box]);
  return (
    <div
      {...restProps}
      ref={boxRef}
      className={cn("particle") + className}
    >
      <canvas
        ref={canvasRef}
        className={cn("particle-canvas")}
      ></canvas>
      <div
        {...restProps}
        className={cn("particle-content") + className}
      >
        {props.children}
      </div>
    </div>
  );
};
export default React.memo(BgParticle);
