import { useClass } from "@/hook";
import React, { useEffect, useRef, useState } from "react";
import style from "./BgParticle.module.scss";
import { useResize } from "@/hook";
import Particles from "@/util/class-particle";
const cn = useClass(style);

namespace type {
  export interface props
    extends React.PropsWithChildren,
      React.HTMLAttributes<HTMLDivElement> {
    particleNum?: number;
  }
}

export function BgParticle(props: type.props) {
  const { particleNum = 50, className = "", ...restProps } = props;
  const [box, setBox] = useState({ width: 0, height: 0 });
  const boxRef = useResize<HTMLDivElement>(({ width, height }) => {
    setBox((prev) => ({ ...prev, width, height }));
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = box.width;
    canvas.height = box.height;
    const particles = new Particles(canvas);
    particles.animate();
    particles.bindEvent();
    return () => {
      particles.abortAnimate();
      particles.abortEvent();
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
}

export default React.memo(BgParticle);
