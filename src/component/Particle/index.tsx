import { useClass } from "@/hook";
import React, { useEffect, useRef, useState } from "react";
import style from "./particle.module.scss";
import { useResize } from "@/hook";
const cn = useClass(style);
class Particle {
  constructor() {}
  draw() {}
  update() {}
}
export default (props: React.PropsWithChildren) => {
  const [box, setBox] = useState({ width: 0, height: 0 });
  const [boxRef] = useResize<HTMLDivElement>((width, height) => {
    setBox((prev) => ({ ...prev, width, height }));
  });

  // 粒子数组
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = box.width;
    canvas.height = box.height;
    const ctx = canvas.getContext("2d")!;
  }, [box]);
  return (
    <div
      {...props}
      ref={boxRef}
      className={cn("particle")}
    >
      <canvas ref={canvasRef}></canvas>
      <div className={cn("particle-content")}>{props.children}</div>
    </div>
  );
};
