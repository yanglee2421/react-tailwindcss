import { useClass } from "@/hook";
import React, { useEffect, useRef, useState } from "react";
import style from "./particle.module.scss";
import { useResize } from "@/hook";
import Particle from "./class-particle";
const cn = useClass(style);
namespace type {
  export interface props extends React.PropsWithChildren {
    particleNum?: number;
  }
}
const BgParticle = (props: type.props) => {
  const { particleNum = 50, ...restProps } = props;
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
    Particle.generate();
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
      className={cn("particle")}
    >
      <canvas
        ref={canvasRef}
        className={cn("particle-canvas")}
      ></canvas>
      <div className={cn("particle-content")}>{props.children}</div>
    </div>
  );
};
export default React.memo(BgParticle);
