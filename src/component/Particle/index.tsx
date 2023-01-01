import { useClass } from "@/hook";
import React, { useEffect, useRef, useState } from "react";
import style from "./particle.module.scss";
const cn = useClass(style);
class Particle {
  constructor() {}
  draw() {}
  update() {}
}
export default (props: React.PropsWithChildren) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const boxDom = boxRef.current!;
    const observer = new ResizeObserver(
      ([
        {
          contentRect: { width, height },
        },
      ]) => {
        setBox((prev) => ({ ...prev, width, height }));
      }
    );
    observer.observe(boxDom);
    const { width, height } = boxDom.getBoundingClientRect();
    setBox((prev) => ({ ...prev, width, height }));
    return () => {
      observer.unobserve(boxDom);
    };
  }, []);

  // 粒子数组
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = box.width;
    canvas.height = box.height;
    const ctx = canvas.getContext("2d")!;
  }, [box]);
  return (
    <div
      ref={boxRef}
      className={cn("particle")}
    >
      <canvas ref={canvasRef}></canvas>
      <div className={cn("particle-content")}>{props.children}</div>
    </div>
  );
};
