import { useClass, useResize } from "@/hook";
import { useEffect, useRef, useState } from "react";
import style from "./particle.module.scss";
import PClass from "@/component/Particle/class-particle";
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
    const pClass = new PClass(canvas, {
      number: 150,
      lineMax: 120,
      color: "199, 199, 199",
    });
    pClass.animate();
    pClass.bindEvent();
    return () => {
      pClass.abortAnimate();
      pClass.abortEvent();
    };
  }, [box]);
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
};
