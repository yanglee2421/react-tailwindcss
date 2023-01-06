import style from "./firework.module.scss";
import { useEffect, useRef, useState } from "react";
import { useClass, useResize } from "@/hook";
import { Fireworks } from "@/util";
const cn = useClass(style);
/**
 * 烟花页面
 * @returns JSX
 */
export function PageFirework() {
  const [box, setBox] = useState({
    width: 0,
    height: 0,
  });
  const boxRef = useResize<HTMLDivElement>(({ width, height }) =>
    setBox((prev) => ({ ...prev, width, height }))
  );
  const canRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canRef.current;
    if (!canvas) return;
    canvas.width = box.width;
    canvas.height = box.height;
    const fire = new Fireworks(canvas);
    fire.bindEvent();
    return () => {
      fire.abortEvent();
    };
  }, [box]);
  return (
    <div ref={boxRef} className={cn("firework-box")}>
      <canvas ref={canRef} className={cn("firework-canvas")}></canvas>
    </div>
  );
}

export default PageFirework;
