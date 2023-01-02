import { useClass, useResize } from "@/hook";
import { useEffect, useRef, useState } from "react";
import style from "./particle.module.scss";
import pClass from "@/component/Particle/class-particle";
const cn = useClass(style);
export default () => {
  const [box, setBox] = useState({ width: 0, height: 0 });
  const [ref] = useResize<HTMLDivElement>(({ width, height }) =>
    setBox((prev) => ({ ...prev, width, height }))
  );
  const canRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canRef.current!;
    canvas.width = box.width;
    canvas.height = box.height;
    pClass.canvas = canvas;
    pClass.generate(150);
    pClass.animate();
    pClass.bindEvent();
    return () => {
      pClass.clear();
      pClass.stopAnimate();
      pClass.abortEvent();
    };
  }, [box]);
  return (
    <div
      ref={ref}
      className={cn("partcle")}
    >
      <canvas ref={canRef}></canvas>
    </div>
  );
};
