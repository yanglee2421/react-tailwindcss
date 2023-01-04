import { useClass, useResize } from "@/hook";
import style from "./firework.module.scss";
import { useEffect, useRef, useState } from "react";
import Fireworks from "@/util/class-firework";

const cn = useClass(style);
function Firework() {
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
    /* setTimeout(() => {
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        clientX: 500,
        clientY: 500,
        buttons: 1,
      });
      canvas.dispatchEvent(event);
    }, 3000); */
  }, [box]);
  return (
    <div
      ref={boxRef}
      className={cn("firework-box")}
    >
      <canvas
        ref={canRef}
        className={cn("firework-canvas")}
      ></canvas>
    </div>
  );
}

export default Firework;
